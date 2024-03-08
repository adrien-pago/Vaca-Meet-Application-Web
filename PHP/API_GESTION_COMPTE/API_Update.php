<?php
// Connexion à la base de données
include '../config.php';

try {
    // Requête SQL pour mettre à jour les informations du camping
    $stmt = $conn->prepare("UPDATE CAMPING SET NOM_CAMPING = :nom, NUM_SIRET = :num_siret, EMAIL = :email WHERE ID_CAMPING = :id_camping");
    $stmt->bindParam(':id_camping', $_POST['id_camping']);
    $stmt->bindParam(':nom', $_POST['nom']);
    $stmt->bindParam(':num_siret', $_POST['num_siret']);
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->execute();

    // Retourner une réponse de succès
    echo json_encode(array("success" => true));
} catch(PDOException $e) {
    // En cas d'erreur, retourner une réponse d'erreur
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}

$stmt->close();
$conn->close();
?>
