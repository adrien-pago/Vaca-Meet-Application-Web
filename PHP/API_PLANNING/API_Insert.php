<?php
include '../config.php';

try {
    $lib_activite = $_POST['lib_activite'];
    $id_structure = $_POST['id_structure'];
    $dateHeureDebut = $_POST['dateHeureDebut'];
    $dateHeureFin = $_POST['dateHeureFin'];
    $id_camping = $_POST['id_camping'];

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("INSERT INTO EVENEMENT (LIB_ACTIVITE, ID_STRUCTURE, DATE_HEURE_DEBUT, DATE_HEURE_FIN, ID_CAMPING) VALUES (:lib_activite, :id_structure, :dateHeureDebut, :dateHeureFin, :id_camping)");
    $stmt->execute(['lib_activite' => $lib_activite, 'id_structure' => $id_structure, 'dateHeureDebut' => $dateHeureDebut, 'dateHeureFin' => $dateHeureFin, 'id_camping' => $id_camping]);

    echo "Inserted successfully";
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}
?>
