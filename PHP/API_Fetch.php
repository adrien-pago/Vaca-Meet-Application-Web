<?php
include 'config.php';

$id_camping = $_GET['id_camping'];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT STRUCTURE.ID_STRUCTURE, CAMPING.NOM_CAMPING, STRUCTURE.LIBELLE_STRUCTURE, STRUCTURE.NB_STRUCTURE 
                        FROM STRUCTURE 
                        JOIN CAMPING ON CAMPING.STRUCTURE = STRUCTURE.ID_STRUCTURE 
                        WHERE STRUCTURE.ID_CAMPING = :id_camping");
$stmt->bindParam(':id_camping', $id_camping);
$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>
