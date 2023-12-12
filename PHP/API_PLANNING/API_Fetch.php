<?php
include 'config.php'; 

$id_camping = $_GET['id_camping']; 
// Préparation de la requête SQL
$query = "SELECT LIBELLE_ACT FROM ACTIVITE WHERE ID_CAMPING = :id_camping";
$stmt = $pdo->prepare($query);
$stmt->execute(['id_camping' => $id_camping]);

// Récupération des résultats
$activities = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retourner les résultats en JSON
echo json_encode($activities);
?>
