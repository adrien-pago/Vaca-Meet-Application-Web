<?php
include 'config.php';

$libelle_act = $_POST['libelle_act'];
$id_camping = $_POST['id_camping'];

// Vérification des données POST
if (empty($libelle_act) || empty($id_camping)) {
    echo "Données POST manquantes ou incorrectes";
    exit;
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("INSERT INTO ACTIVITE (LIBELLE_ACT, ID_CAMPING) VALUES (:libelle_act, :id_camping)");
    $stmt->bindParam(':libelle_act', $libelle_act);
    $stmt->bindParam(':id_camping', $id_camping, PDO::PARAM_INT);
    $stmt->execute();

    echo "Inserted successfully";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}

?>
