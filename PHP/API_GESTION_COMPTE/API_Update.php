<?php
include '../config.php';

try {
    // Vérification des données POST
    if (!isset($_POST['id_camping']) || !isset($_POST['nom']) || !isset($_POST['num_siret']) || !isset($_POST['email'])) {
        throw new Exception('Données POST manquantes');
    }

    $id_camping = $_POST['id_camping'];
    $nom = $_POST['nom'];
    $num_siret = $_POST['num_siret'];
    $email = $_POST['email'];

    // Requête SQL pour mettre à jour les informations du camping
    $stmt = $conn->prepare("UPDATE CAMPING SET NOM_CAMPING = ?, NUM_SIRET = ?, EMAIL = ? WHERE ID_CAMPING = ?");
    $stmt->bind_param("sisi", $nom, $num_siret, $email, $id_camping);
    $stmt->execute();

    // Retourner une réponse de succès
    echo json_encode(array("success" => true));
} catch (Exception $e) {
    // En cas d'erreur, retourner une réponse d'erreur
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
}

$stmt->close();
$conn->close();
?>
