<?php
include '../config.php';

$input = json_decode(file_get_contents('php://input'), true); // Lire les données JSON du corps de la requête

try {
    // Vérifier si l'id_camping est présent dans les données reçues
    if (!isset($input['id_camping'])) {
        throw new Exception('ID du camping manquant');
    }

    $id_camping = $input['id_camping'];

    $conn->begin_transaction(); // Transaction pour Sécurité

    // Suppression des room events liés au camping
    $stmt = $conn->prepare("DELETE FROM ROOM_EVENT WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();
    $stmt->close();

    // Suppression des événements liés au camping
    $stmt = $conn->prepare("DELETE FROM EVENEMENT WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();
    $stmt->close();

    // Suppression des activités liées au camping
    $stmt = $conn->prepare("DELETE FROM ACTIVITE WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();
    $stmt->close();

    // Suppression des structures liées au camping
    $stmt = $conn->prepare("DELETE FROM STRUCTURE WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();
    $stmt->close();

    // Enfin, suppression du camping lui-même
    $stmt = $conn->prepare("DELETE FROM CAMPING WHERE ID_CAMPING = ?");
    $stmt->bind_param("i", $id_camping);
    $stmt->execute();
    $stmt->close();

    $conn->commit(); // Valider la transaction
    echo json_encode(array("success" => true));
} catch (Exception $e) {
    $conn->rollback(); // En cas d'erreur, annuler toutes les opérations
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => $e->getMessage()));
} finally {
    $conn->close();
}

