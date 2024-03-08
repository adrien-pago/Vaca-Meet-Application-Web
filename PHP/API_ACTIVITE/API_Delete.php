<?php
include '../config.php';

try {
    // Vérification des données POST
    if (!isset($_POST['id_activite'])) {
        throw new Exception('ID de l\'activité manquant');
    }

    $id_activite = $_POST['id_activite'];

    $stmt = $conn->prepare("DELETE FROM ACTIVITE WHERE ID_ACTIVITE = ?");
    $stmt->bind_param("i", $id_activite);
    $stmt->execute();

    echo "Deleted successfully";
} catch (Exception $e) {
    // Gestion des erreurs
    echo "Erreur : " . $e->getMessage();
}

// Fermeture des ressources
$stmt->close();
$conn->close();
?>
