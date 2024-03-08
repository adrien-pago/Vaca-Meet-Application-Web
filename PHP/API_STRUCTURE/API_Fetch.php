<?php
include '../config.php';

try {
    $id_camping = $_GET['id_camping'];

    if (empty($id_camping)) {
        throw new Exception('ID du camping manquant');
    }

    $stmt = $conn->prepare("SELECT STRUCTURE.ID_STRUCTURE, CAMPING.NOM_CAMPING, STRUCTURE.LIBELLE_STRUCTURE, STRUCTURE.NB_STRUCTURE 
        FROM STRUCTURE 
        JOIN CAMPING ON CAMPING.ID_CAMPING = STRUCTURE.ID_CAMPING 
        WHERE STRUCTURE.ID_CAMPING = ?");
        
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();

    $result = $stmt->get_result();
    $results = $result->fetch_all(MYSQLI_ASSOC); 
    echo json_encode($results);

} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
