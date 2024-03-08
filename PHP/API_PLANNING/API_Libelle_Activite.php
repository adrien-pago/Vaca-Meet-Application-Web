<?php
include '../config.php';

try {
    // Récupérer l'ID du camping depuis la requête GET
    $id_camping = isset($_GET['id_camping']) ? $_GET['id_camping'] : null;

    // Vérifier si l'ID du camping est fourni
    if (!$id_camping) {
        echo json_encode(['error' => 'ID camping manquant']);
        exit;
    }
    // Préparer et exécuter la requête
    $stmt = $conn->prepare("SELECT DISTINCT LIBELLE_ACT FROM ACTIVITE WHERE ID_CAMPING = :id_camping ORDER BY LIBELLE_ACT");
    $stmt->bindParam("i",':id_camping', $id_camping);
    $stmt->execute();

    // Récupérer tous les résultats
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);

} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
