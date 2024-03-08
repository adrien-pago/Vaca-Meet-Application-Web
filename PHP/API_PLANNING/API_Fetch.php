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
        WHERE ID_CAMPING = :id_camping 
        AND DATE_HEURE_DEBUT >= :dateDebut 
        AND DATE_HEURE_FIN <= :dateFin
    ");
    $stmt->bindParam(':id_camping', $id_camping);
    $stmt->bindParam(':dateDebut', $dateDebut);
    $stmt->bindParam(':dateFin', $dateFin);
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
