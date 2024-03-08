<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Récupérer le jeton de confirmation à partir de l'URL
$confirm_token = $_GET['token'];
// Vérifier si le jeton de confirmation existe dans la base de données
$sql = "SELECT * FROM CAMPING WHERE TOKEN_CONFIRM ='$confirm_token'";
$result = $conn->query($sql);
echo "Jeton récupéré : " . $confirm_token . "<br>";


if ($result->num_rows == 1) {
    // Si le jeton de confirmation est valide, mettre à jour la colonne `TOP_USER_CONFIRMED` à 1
    $sql = "UPDATE CAMPING SET TOP_USER_CONFIRMED=1 WHERE TOKEN_CONFIRM ='$confirm_token'";
    if ($conn->query($sql) === TRUE) {
        // Afficher un message de confirmation à l'utilisateur
        echo "Votre compte a été confirmé avec succès.";
    } else {
        // Afficher un message d'erreur en cas de problème avec la base de données
        echo "Une erreur s'est produite lors de la confirmation de votre compte. Veuillez réessayer.";
    }
} else {
    // Afficher un message d'erreur si le jeton de confirmation est invalide
    echo "Le jeton de confirmation est invalide. Veuillez réessayer.";
}

// Fermer la connexion à la base de données
$stmt->close();
$conn->close();
?>
