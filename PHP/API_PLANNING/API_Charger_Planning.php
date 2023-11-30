<?php
header('Content-Type: application/json');

include 'config.php';

try {
    $id_camping = $_GET['id_camping'];

    if (empty($id_camping)) {
        throw new Exception('ID du camping manquant');
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}


    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des paramètres
    $dateDebut = $_GET['dateDebut'] ?? date('Y-m-d');
    $dateFin = $_GET['dateFin'] ?? date('Y-m-d', strtotime($dateDebut . ' + 6 days'));
    
    // Requête pour récupérer les activités
    $stmt = $db->prepare("SELECT `DATE_HEURE_DEBUT`, `DATE_HEURE_FIN`, `ID_PLANNING`, `LIB_ACTIVITE` FROM `PLANNING` WHERE `DATE_HEURE_DEBUT` >= :dateDebut AND `DATE_HEURE_FIN` <= :dateFin");
    $stmt->execute(['dateDebut' => $dateDebut, 'dateFin' => $dateFin]);
    $activites = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($activites);
    



