<?php
include '../config.php';

// Vérification des données POST
if (!isset($_POST['id_camping']) || !isset($_POST['id_structure']) || !isset($_POST['libelle_structure']) || !isset($_POST['nb_structure'])) {
    echo "Données POST manquantes";
    exit;
}

$id_camping = $_POST['id_camping'];
$id_structure = $_POST['id_structure'];
$libelle_structure = $_POST['libelle_structure'];
$nb_structure = $_POST['nb_structure'];

try {
    $stmt = $conn->prepare("
        UPDATE STRUCTURE 
        SET LIBELLE_STRUCTURE = ?, NB_STRUCTURE = ? 
        WHERE ID_STRUCTURE = ? AND ID_CAMPING = ?
    ");

    $stmt->bind_param("siii", $libelle_structure, $nb_structure, $id_structure, $id_camping);

    // Début de la transaction
    $conn->begin_transaction();
    
    $stmt->execute();
    
    // Commit de la transaction
    $conn->commit();
    
    echo "Updated successfully";
} catch (Exception $e) {
    // Rollback de la transaction en cas d'erreur
    $conn->rollback();
    echo "Erreur : " . $e->getMessage();
}

$stmt->close();
$conn->close();
?>
