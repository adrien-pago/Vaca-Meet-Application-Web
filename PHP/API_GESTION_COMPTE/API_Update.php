<?php
include '../config.php';

// Lire les données JSON brutes depuis le corps de la requête
$inputJSON = file_get_contents('php://input');
// Décoder le JSON pour obtenir un tableau associatif
$input = json_decode($inputJSON, TRUE); // convertir en tableau associatif

try {
    // Utiliser les données du tableau associatif
    $id_camping = $input['id_camping'];
    $nom = $input['nomCamping'];
    $num_siret = (int)$input['num_siret'];
    $email = $input['email'];

    var_dump($input); // Pour le débogage

    $stmt = $conn->prepare("UPDATE CAMPING SET NOM_CAMPING = ?, NUM_SIRET = ?, EMAIL = ? WHERE ID_CAMPING = ?");
    $stmt->bind_param("sisi", $nom, $num_siret, $email, $id_camping);
    $stmt->execute();

    // Vérifier si des lignes ont été affectées par la requête UPDATE
    if ($stmt->affected_rows > 0) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "error" => "Aucune ligne mise à jour"));
    }
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("success" => false, "error" => $e->getMessage()));
}
// Pas besoin de catch PDOException ici car vous utilisez mysqli

if (isset($stmt)) {
    $stmt->close();
}
if (isset($conn)) {
    $conn->close();
}
?>
