<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // Répondre immédiatement pour la prévol
  http_response_code(200);
  exit;
}

// Votre logique existante…
if (isset($_GET['prompt'])) {
    echo json_encode(['reply' => 'Bonjour, je suis un bot !']);
} else {
    echo json_encode(['error' => 'Aucun prompt fourni.']);
}
