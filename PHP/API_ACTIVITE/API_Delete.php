<?php
require_once 'config.php';

$id_activite = $_POST['id_activite'];

$stmt = $conn->prepare("DELETE FROM ACTIVITE WHERE ID_ACTIVITE = :id_activite");
$stmt->bindParam(':id_activite', $id_activite);
$stmt->execute();

echo "Deleted successfully";

$stmt->close();
$conn->close();
?>
