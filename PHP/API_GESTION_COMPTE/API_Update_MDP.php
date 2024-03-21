<?php
include '../config.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$id_camping = $input['id_camping'];
$new_password = $input['new_password'];

// Hachage du nouveau mot de passe
$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

// Préparation de la requête SQL pour mettre à jour le mot de passe
$query = "UPDATE CAMPING SET PASSWORD = ? WHERE ID_CAMPING = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $hashed_password, $id_camping);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
