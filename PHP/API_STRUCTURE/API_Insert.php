<?php
include 'config.php';

$libelle_structure = $_POST['libelle_structure'];
$nb_structure = $_POST['nb_structure'];
$id_camping = $_POST['id_camping'];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("INSERT INTO STRUCTURE (LIBELLE_STRUCTURE, NB_STRUCTURE, ID_CAMPING) VALUES (:libelle_structure, :nb_structure, :id_camping)");
$stmt->bindParam(':libelle_structure', $libelle_structure);
$stmt->bindParam(':nb_structure', $nb_structure);
$stmt->bindParam(':id_camping', $id_camping);
$stmt->execute();

echo "Inserted successfully";
?>
