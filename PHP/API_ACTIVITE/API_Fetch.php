<?php
require_once 'config.php';

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

try {
    
    $id_camping = $_GET['id_camping'];

    if (empty($id_camping)) {
        throw new Exception('ID du camping manquant');
    }

    $stmt = $conn->prepare("
    SELECT ID_ACTIVITE ,LIBELLE_ACT FROM ACTIVITE WHERE ID_CAMPING = :id_camping 
    ");
    $stmt->bindParam(':id_camping', $id_camping);
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
