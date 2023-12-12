<?php
include 'config.php';

// Vérification des données POST
if (!isset($_POST['id_camping']) || !isset($_POST['id_activite']) || !isset($_POST['libelle_act'])) {
    echo "Données POST manquantes";
    exit;
}

$id_camping = $_POST['id_camping'];
$id_activite = $_POST['id_activite'];
$libelle_act = $_POST['libelle_act'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
        UPDATE ACTIVITE
        SET LIBELLE_ACT = :libelle_act
        WHERE ID_ACTIVITE = :id_activite AND ID_CAMPING = :id_camping
    ");  

    $stmt->bindParam(':libelle_act', $libelle_act);
    $stmt->bindParam(':id_activite', $id_activite, PDO::PARAM_INT);
    $stmt->bindParam(':id_camping', $id_camping, PDO::PARAM_INT);

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
