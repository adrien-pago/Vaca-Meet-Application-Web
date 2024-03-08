<?php
include '../config.php';

// Vérification des données POST
if (!isset($_POST['id_camping']) || !isset($_POST['id_activite']) || !isset($_POST['libelle_act'])) {
    echo "Données POST manquantes";
    exit;
}

$id_camping = $_POST['id_camping'];
$id_activite = $_POST['id_activite'];
$libelle_act = $_POST['libelle_act'];

try {
    $stmt = $conn->prepare("
        UPDATE ACTIVITE
        SET LIBELLE_ACT = ?
        WHERE ID_ACTIVITE = ? AND ID_CAMPING = ?
    ");  

    $stmt->bind_param("sii", $libelle_act, $id_activite, $id_camping);

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
