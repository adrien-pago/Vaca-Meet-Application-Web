<?php
include 'config.php';

try {
    $id_camping = $_GET['id_camping'];

    if (empty($id_camping)) {
        throw new Exception('ID du camping manquant');
    }

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
        SELECT STRUCTURE.ID_STRUCTURE, CAMPING.NOM_CAMPING, STRUCTURE.LIBELLE_STRUCTURE, STRUCTURE.NB_STRUCTURE 
        FROM STRUCTURE 
        JOIN CAMPING ON CAMPING.ID_CAMPING = STRUCTURE.ID_CAMPING 
        WHERE STRUCTURE.ID_CAMPING = :id_camping
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
?>
