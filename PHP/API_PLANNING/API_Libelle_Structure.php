<?php
include '../config.php';

try {
    $id_camping = isset($_GET['id_camping']) ? $_GET['id_camping'] : null;

    if (!$id_camping) {
        echo json_encode(['error' => 'ID camping manquant']);
        exit;
    }
    
    $stmt = $conn->prepare("SELECT ID_STRUCTURE, LIBELLE_STRUCTURE FROM STRUCTURE WHERE ID_CAMPING = :id_camping");
    $stmt->bindParam(':id_camping', $id_camping, PDO::PARAM_INT);
    $stmt->execute();

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
