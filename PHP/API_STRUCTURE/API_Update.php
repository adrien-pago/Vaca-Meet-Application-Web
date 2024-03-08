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
        SET LIBELLE_STRUCTURE = :libelle_structure, NB_STRUCTURE = :nb_structure 
        WHERE ID_STRUCTURE = :id_structure AND ID_CAMPING = :id_camping
    ");  

    $stmt->bindParam("s",':libelle_structure', $libelle_structure);
    $stmt->bindParam("i",':nb_structure', $nb_structure);  
    $stmt->bindParam("i",':id_structure', $id_structure); 
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
