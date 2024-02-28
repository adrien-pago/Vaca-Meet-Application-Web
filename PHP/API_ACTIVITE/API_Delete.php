<?php
include 'config.php';

$id_activite = $_POST['id_activite'];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("DELETE FROM ACTIVITE WHERE ID_ACTIVITE = :id_activite");
$stmt->bindParam(':id_activite', $id_activite);
$stmt->execute();

echo "Deleted successfully";
?>
