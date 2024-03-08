<?php
include '../config.php';

try {
    $id_camping = $_GET['id_camping'];
    $dateDebut = $_GET['dateDebut'];
    $dateFin = $_GET['dateFin'];

    if (empty($id_camping)) {
        throw new Exception('ID du camping manquant');
    }

    $stmt = $conn->prepare("
        SELECT LIB_ACTIVITE, DATE_HEURE_DEBUT, DATE_HEURE_FIN 
        FROM EVENEMENT
        WHERE ID_CAMPING = ? 
        AND DATE_HEURE_DEBUT >= ? 
        AND DATE_HEURE_FIN <= ?
    ");
    $stmt->bind_param("iss", $id_camping, $dateDebut, $dateFin);
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
