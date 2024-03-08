<?php
include '../config.php';

$libelle_act = $_POST['libelle_act'];
$id_camping = $_POST['id_camping'];

// Vérification des données POST
if (empty($libelle_act) || empty($id_camping)) {
    echo "Données POST manquantes ou incorrectes";
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO ACTIVITE (LIBELLE_ACT, ID_CAMPING) VALUES (:libelle_act, :id_camping)");
    $stmt->bindParam("s",':libelle_act', $libelle_act);
    $stmt->bindParam("i",':id_camping', $id_camping);
    $stmt->execute();

    echo "Inserted successfully";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}

$stmt->close();
$conn->close();
?>
