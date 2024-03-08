<?php
include '../config.php';

try {
    // Vérification des données POST
    if (!isset($_POST['id_camping'])) {
        throw new Exception('ID du camping manquant');
    }

    $id_camping = $_POST['id_camping'];

    // Requête SQL pour supprimer le camping
    $stmt = $conn->prepare("DELETE FROM CAMPING WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
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
