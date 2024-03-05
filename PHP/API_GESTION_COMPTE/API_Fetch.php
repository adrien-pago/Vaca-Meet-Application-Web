<?php
// Connexion à la base de données
include '../config.php';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL pour récupérer les informations du camping
    $stmt = $conn->prepare("SELECT NOM_CAMPING, NUM_SIRET, EMAIL FROM CAMPING WHERE ID_CAMPING = :id_camping");
    $stmt->bindParam(':id_camping', $_POST['id_camping']); 

    $stmt->execute();

    $campingData = $stmt->fetch(PDO::FETCH_ASSOC);

    // Retourner les données au format JSON
    header('Content-Type: application/json');
    echo json_encode($campingData);
} catch(PDOException $e) {
    // En cas d'erreur, retourner une réponse d'erreur
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}
?>
