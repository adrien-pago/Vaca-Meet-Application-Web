<?php
include '../config.php';

$libelle_structure = $_POST['libelle_structure'];
$nb_structure = $_POST['nb_structure'];
$id_camping = $_POST['id_camping'];

$stmt = $conn->prepare("INSERT INTO STRUCTURE (LIBELLE_STRUCTURE, NB_STRUCTURE, ID_CAMPING) VALUES (:libelle_structure, :nb_structure, :id_camping)");
$stmt->bindParam("s",':libelle_structure', $libelle_structure);
$stmt->bindParam("i",':nb_structure', $nb_structure);
$stmt->bindParam("i",':id_camping', $id_camping);
$stmt->execute();

echo "Inserted successfully";

$stmt->close();
$conn->close();
?>
