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
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
        UPDATE STRUCTURE 
        SET LIBELLE_STRUCTURE = :libelle_structure, NB_STRUCTURE = :nb_structure 
        WHERE ID_STRUCTURE = :id_structure AND ID_CAMPING = :id_camping
    ");  

    $stmt->bindParam(':libelle_structure', $libelle_structure);
    $stmt->bindParam(':nb_structure', $nb_structure, PDO::PARAM_INT);  // Assurez-vous que nb_structure est traité comme un entier
    $stmt->bindParam(':id_structure', $id_structure, PDO::PARAM_INT);  // Assurez-vous que id_structure est traité comme un entier
    $stmt->bindParam(':id_camping', $id_camping, PDO::PARAM_INT);  // Assurez-vous que id_camping est traité comme un entier

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

?>
