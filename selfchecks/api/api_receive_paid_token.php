<?php

header('Content-Type: application/json');

// ---------- Réponse JSON ----------
function jsonResponse($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// ---------- Vérification Authorization ----------
$headers = getallheaders();

$auth =
    $headers['Authorization']
    ?? $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? '';

$secret = 'MA_CLE_SECRETE';

if ($auth !== "Bearer $secret") {
    jsonResponse(401, [
        'error' => 'Unauthorized'
    ]);
}

// ---------- Lecture JSON ----------
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    jsonResponse(400, [
        'error' => 'JSON invalide'
    ]);
}

// ---------- Vérification champs ----------
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

// ---------- Connexion DB ----------
try {

    $pdo = new PDO(
        'mysql:host=localhost;dbname=DATABASE_NAME;charset=utf8mb4',
        'DB_USER',
        'DB_PASSWORD',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

    // ---------- Insertion ----------
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
        'success' => true
    ]);

} catch (Throwable $e) {

    jsonResponse(500, [
        'error' => $e->getMessage()
    ]);
}