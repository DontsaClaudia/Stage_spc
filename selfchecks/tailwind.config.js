/** @type {import('tailwindcss').Config} */
export default {
  // On indique à Tailwind quels fichiers scanner pour générer les classes CSS
  // Sans ça, Tailwind ne sait pas quelles classes tu utilises et génère rien
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    extend: {
      // On ajoute nos propres couleurs personnalisées à Tailwind
      // Elles s'utilisent comme n'importe quelle classe Tailwind : bg-red-sc, text-navy, etc.
      colors: {
        'red-sc': '#E30613',   // Rouge principal Self Checks
        'red-dark': '#b30000', // Rouge foncé pour les hover
        navy: '#0f2140',       // Bleu marine (fond sections)
        cream: '#f8f6f2',      // Blanc cassé (texte principal)
        muted: '#c8c4bc',      // Gris clair (texte secondaire)
        ink: '#080c14',        // Noir profond (fond global)
      },
      // On ajoute nos polices Google Fonts
      // Elles s'utilisent avec : font-condensed ou font-body
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'], // Titres impactants
        body: ['Barlow', 'sans-serif'],                  // Texte courant
      },
    },
  },
  plugins: [],
}