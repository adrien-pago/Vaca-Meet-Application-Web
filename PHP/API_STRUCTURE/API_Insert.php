<?php
include '../config.php';

$libelle_structure = $_POST['libelle_structure'];
$nb_structure = $_POST['nb_structure'];
$id_camping = $_POST['id_camping'];

$stmt = $conn->prepare("INSERT INTO STRUCTURE (LIBELLE_STRUCTURE, NB_STRUCTURE, ID_CAMPING) VALUES (?, ?, ?)");
$stmt->bind_param("sii", $libelle_structure, $nb_structure, $id_camping);
$stmt->execute();

echo "Inserted successfully";

$stmt->close();
$conn->close();
?>
