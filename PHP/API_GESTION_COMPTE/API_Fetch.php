<?php
include '../config.php';

try {
    // Vérifier si l'id du camping est fourni dans la requête POST
    if (!isset($_POST['id_camping'])) {
        throw new Exception('ID du camping manquant');
    }

    // Requête SQL pour récupérer les informations du camping
    $stmt = $conn->prepare("SELECT NUM_SIRET, EMAIL FROM CAMPING WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $_POST['id_camping']); 

    $stmt->execute();

    // Récupérer les données du camping
    $result = $stmt->get_result();
    $campingData = $result->fetch_all(MYSQLI_ASSOC);
  
    // Retourner les données au format JSON
    header('Content-Type: application/json');
    echo json_encode($campingData);
} catch (Exception $e) {
    // En cas d'erreur, retourner une réponse d'erreur
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}

// Fermer la requête et la connexion à la base de données
$stmt->close();
$conn->close();
?>
