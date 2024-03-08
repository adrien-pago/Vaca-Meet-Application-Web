<?php
include '../config.php';

try {
    if (!isset($_POST['id_camping'])) {
        throw new Exception('ID du camping manquant');
    }

    $id_camping = $_POST['id_camping'];

    $stmt = $conn->prepare("DELETE FROM CAMPING WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();

    echo json_encode(array("success" => true));
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}

$stmt->close();
$conn->close();
?>
