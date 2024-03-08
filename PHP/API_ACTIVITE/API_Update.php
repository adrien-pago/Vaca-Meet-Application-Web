<?php
include '../config.php';

// Vérification des données POST
if (!isset($_POST['id_camping']) || !isset($_POST['id_activite']) || !isset($_POST['libelle_act'])) {
    echo "Données POST manquantes";
    echo($_POST['id_camping']) ;
    echo($_POST['id_activite']) ;
    echo($_POST['libelle_act']) ;
    exit;
}

$id_camping = $_POST['id_camping'];
$id_activite = $_POST['id_activite'];
$libelle_act = $_POST['libelle_act'];

try {
    $stmt = $conn->prepare("
        UPDATE ACTIVITE
        SET LIBELLE_ACT = :libelle_act
        WHERE ID_ACTIVITE = :id_activite AND ID_CAMPING = :id_camping
    ");  

    $stmt->bindParam("s",':libelle_act', $libelle_act);
    $stmt->bindParam("i",':id_activite', $id_activite);
    $stmt->bindParam("i",':id_camping', $id_camping);

    // Début de la transaction
    $conn->beginTransaction();
    
    $stmt->execute();
    
    // Commit de la transaction
    $conn->commit();
    
    echo "Updated successfully";
} catch (PDOException $e) {
    // Rollback de la transaction en cas d'erreur
    $conn->rollBack();
    echo "Erreur : " . $e->getMessage();
}

$stmt->close();
$conn->close();

?>
