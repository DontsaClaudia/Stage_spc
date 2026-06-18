<?php

header('Content-Type: application/json');

function jsonResponse($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$headers = getallheaders();

$auth =
    $headers['Authorization']
    ?? $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? '';

$secret = getenv('PHP_API_SECRET') ?: '';

if ($secret === '' || $auth !== "Bearer $secret") {
    jsonResponse(401, [
        'error' => 'Unauthorized'
    ]);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    jsonResponse(400, [
        'error' => 'JSON invalide'
    ]);
}

$required = [
    'token',
    'email',
    'role',
    'stripe_session_id'
];

foreach ($required as $field) {
    if (empty($input[$field])) {
        jsonResponse(400, [
            'error' => "Champ manquant : $field"
        ]);
    }
}

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=DATABASE_NAME;charset=utf8mb4',
        'DB_USER',
        'DB_PASSWORD',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

    $check = $pdo->prepare(
        'SELECT token FROM signup_tokens WHERE stripe_session_id = :stripe_session_id LIMIT 1'
    );
    $check->execute([
        ':stripe_session_id' => $input['stripe_session_id']
    ]);
    $existing = $check->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        jsonResponse(200, [
            'success' => true,
            'already_exists' => true,
            'token' => $existing['token']
        ]);
    }

    $tokenCheck = $pdo->prepare(
        'SELECT token FROM signup_tokens WHERE token = :token LIMIT 1'
    );
    $tokenCheck->execute([
        ':token' => $input['token']
    ]);
    $existingToken = $tokenCheck->fetch(PDO::FETCH_ASSOC);

    if ($existingToken) {
        jsonResponse(200, [
            'success' => true,
            'already_exists' => true,
            'token' => $existingToken['token']
        ]);
    }

    $stmt = $pdo->prepare("
        INSERT INTO signup_tokens
        (
            token,
            email,
            role,
            offre,
            paid,
            stripe_session_id,
            source_site
        )
        VALUES
        (
            :token,
            :email,
            :role,
            :offre,
            1,
            :stripe_session_id,
            :source_site
        )
    ");

    $stmt->execute([
        ':token' => $input['token'],
        ':email' => $input['email'],
        ':role' => $input['role'],
        ':offre' => $input['offre'] ?? null,
        ':stripe_session_id' => $input['stripe_session_id'],
        ':source_site' => $input['source_site'] ?? 'Self Checks'
    ]);

    jsonResponse(200, [
        'success' => true,
        'already_exists' => false
    ]);

} catch (Throwable $e) {
    $message = $e->getMessage();

    if (
        str_contains($message, '1062')
        && str_contains($message, 'uk_signup_tokens_token')
        && !empty($input['token'])
    ) {
        jsonResponse(200, [
            'success' => true,
            'already_exists' => true,
            'token' => $input['token']
        ]);
    }

    jsonResponse(500, [
        'error' => $message
    ]);
}
