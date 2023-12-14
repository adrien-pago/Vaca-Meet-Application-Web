<?php
include 'config.php';

try {
    $id_camping = $_GET['id_camping'];
    $dateDebut = $_GET['dateDebut'];
    $dateFin = $_GET['dateFin'];
    
    // Assurez-vous que les variables ne sont pas vides et sont des dates valides
    if (empty($id_camping) || empty($dateDebut) || empty($dateFin) || !strtotime($dateDebut) || !strtotime($dateFin)) {
        exit('Paramètres invalides');
    }
    
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
    SELECT LIB_ACTIVITE, DATE_HEURE_DEBUT, DATE_HEURE_FIN FROM EVENEMENT WHERE ID_CAMPING = :id_camping AND DATE_HEURE_DEBUT >= :dateDebut AND DATE_HEURE_FIN <= :dateFin
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
?>
