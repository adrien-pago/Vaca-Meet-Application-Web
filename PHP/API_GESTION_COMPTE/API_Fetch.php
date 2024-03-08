<?php
include '../config.php';

try {
    if (!isset($_POST['id_camping'])) {
        throw new Exception('ID du camping manquant');
    }

    $stmt = $conn->prepare("SELECT NUM_SIRET, EMAIL, NOM_CAMPING FROM CAMPING WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $_POST['id_camping']); 

    $stmt->execute();

    $result = $stmt->get_result();
    $campingData = $result->fetch_all(MYSQLI_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($campingData);
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}

$stmt->close();
$conn->close();
?>
