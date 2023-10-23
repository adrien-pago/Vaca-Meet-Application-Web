<?php
include 'config.php';

$id_structure = $_POST['id_structure'];
$libelle_structure = $_POST['libelle_structure'];
$nb_structure = $_POST['nb_structure'];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("UPDATE STRUCTURE SET LIBELLE_STRUCTURE = :libelle_structure, NB_STRUCTURE = :nb_structure WHERE ID_STRUCTURE = :id_structure");
$stmt->bindParam(':libelle_structure', $libelle_structure);
$stmt->bindParam(':nb_structure', $nb_structure);
$stmt->bindParam(':id_structure', $id_structure);
$stmt->execute();

echo "Updated successfully";
?>
