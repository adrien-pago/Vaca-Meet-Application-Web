<?php
session_start();  // Démarrez la session en haut de votre fichier PHP

set_include_path(get_include_path() . PATH_SEPARATOR . '/var/www/vhosts/vaca-meet/httpdocs/vendor');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    $response_array['status'] = 'error';
    $response_array['message'] = 'Méthode de requête non autorisée.';
    echo json_encode($response_array);
    die();
}

error_log('Erreur lors de la vérification des informations de connexion.');

header('Content-Type: application/json');

$username = isset($_POST['CampingName']) ? $_POST['CampingName'] : '';
$password = isset($_POST['PasswordCamping']) ? $_POST['PasswordCamping'] : '';

require_once 'config.php';

$sql = "SELECT * FROM CAMPING WHERE NOM_CAMPING=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['PASSWORD'])) {
        if ($row['TOP_USER_CONFIRMED'] == 1) {
            $_SESSION['camping_id'] = $row['ID_CAMPING'];  // Stockez l'ID du camping dans la session
            $_SESSION['camping_name'] = $row['NOM_CAMPING'];  // Stockez le nom du camping dans la session
            $response_array['status'] = 'success';
            $response_array['message'] = 'Vous êtes connecté avec succès.';
            $response_array['id'] = $row['ID_CAMPING'];  // Pour renvoyer aussi l id de la session
            echo json_encode($response_array);
        } else {
            $response_array['status'] = 'error';
            $response_array['message'] = 'Votre compte n\'a pas encore été confirmé. Veuillez vérifier votre boîte e-mail.';
            echo json_encode($response_array);
        }
    } else {
        $response_array['status'] = 'error';
        $response_array['message'] = 'Le mot de passe est incorrect.';
        echo json_encode($response_array);
    }
}
else {
    $response_array['status'] = 'error';
    $response_array['message'] = 'Le nom d\'utilisateur est incorrect.';
    echo json_encode($response_array);
}

$stmt->close();
$conn->close();
?>
