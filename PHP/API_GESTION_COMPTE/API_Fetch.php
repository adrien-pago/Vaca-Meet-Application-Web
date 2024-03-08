<?php
include '../config.php';

try {
    // Requête SQL pour récupérer les informations du camping
    $stmt = $conn->prepare("SELECT NUM_SIRET, EMAIL FROM CAMPING WHERE ID_CAMPING = :id_camping");
    $stmt->bindParam("i",':id_camping', $_POST['id_camping']); 

    $stmt->execute();

    $campingData = $stmt->fetch(PDO::FETCH_ASSOC);

    // Retourner les données au format JSON
    header('Content-Type: application/json');
} catch(PDOException $e) {
    // En cas d'erreur, retourner une réponse d'erreur
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}

$stmt->close();
$conn->close();
?>
