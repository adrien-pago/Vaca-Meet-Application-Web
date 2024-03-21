<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'config.php'; // Se connecter à la base de données

$confirm_token = $_GET['token']; // Récupérer le jeton de confirmation à partir de l'URL

// Vérifier si le jeton de confirmation existe dans la base de données en utilisant une requête préparée
$sql = "SELECT * FROM CAMPING WHERE TOKEN_CONFIRM = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $confirm_token);
$stmt->execute();
$result = $stmt->get_result();
echo "Jeton récupéré : " . htmlspecialchars($confirm_token) . "<br>";

if ($result->num_rows == 1) {
    // Si le jeton de confirmation est valide, mettre à jour la colonne `TOP_USER_CONFIRMED` à 1
    $sql = "UPDATE CAMPING SET TOP_USER_CONFIRMED = 1 WHERE TOKEN_CONFIRM = ?";
    $update_stmt = $conn->prepare($sql);
    $update_stmt->bind_param("s", $confirm_token);
    if ($update_stmt->execute()) {
        echo "Votre compte a été confirmé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de la confirmation de votre compte. Veuillez réessayer.";
    }
    $update_stmt->close(); // Fermer la déclaration après l'exécution
} else {
    echo "Le jeton de confirmation est invalide. Veuillez réessayer.";
}

$stmt->close(); // Fermer la première déclaration
$conn->close(); // Fermer la connexion à la base de données



