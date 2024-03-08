<?php
include '../config.php';

try {
    // Vérification des données POST
    if (!isset($_POST['lib_activite']) || !isset($_POST['id_structure']) || !isset($_POST['dateHeureDebut']) || !isset($_POST['dateHeureFin']) || !isset($_POST['id_camping'])) {
        throw new Exception('Données POST manquantes');
    }

    // Récupération des données POST
    $lib_activite = $_POST['lib_activite'];
    $id_structure = $_POST['id_structure'];
    $dateHeureDebut = $_POST['dateHeureDebut'];
    $dateHeureFin = $_POST['dateHeureFin'];
    $id_camping = $_POST['id_camping'];

    // Requête SQL pour insérer un événement
    $stmt = $conn->prepare("INSERT INTO EVENEMENT (LIB_ACTIVITE, ID_STRUCTURE, DATE_HEURE_DEBUT, DATE_HEURE_FIN, ID_CAMPING) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss", $lib_activite, $id_structure, $dateHeureDebut, $dateHeureFin, $id_camping);
    $stmt->execute();

    // Retourner une réponse de succès
    echo "Inserted successfully";
} catch (Exception $e) {
    // En cas d'erreur, retourner une réponse d'erreur
    error_log($e->getMessage());
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}

$stmt->close();
$conn->close();
?>
