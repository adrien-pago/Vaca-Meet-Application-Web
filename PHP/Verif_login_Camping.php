<?php
set_include_path(get_include_path() . PATH_SEPARATOR . '/var/www/vhosts/pago-family-games.com/httpdocs/vendor');



if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    $response_array['status'] = 'error';
    $response_array['message'] = 'Méthode de requête non autorisée.';
    echo json_encode($response_array);
    die();
}
error_log('Erreur lors de la vérification des informations de connexion.');

// indiquer explicitement que la réponse est de type JSON.
header('Content-Type: application/json');

// Récupérer les données du formulaire
$username = $_POST['usernameC'];
$password = $_POST['passwordC'];

// Inclure les informations de connexion depuis le fichier de configuration
require_once 'db_config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Vérifier si l'utilisateur existe dans la base de données
$sql = "SELECT * FROM USER WHERE USERNAME=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    // Vérifier si le mot de passe est correct
    if (password_verify($password, $row['PASSWORD'])) {
        // Vérifier si l'utilisateur a confirmé son compte
        if ($row['TOP_USER_CONFIRMED'] == 1) {
            // Si l'utilisateur existe et que le mot de passe est correct et que son compte est confirmé, retourner un message de succès
            $response_array['status'] = 'success';
            $response_array['message'] = 'Vous êtes connecté avec succès.';
            echo json_encode($response_array);
        } else {
            // Si l'utilisateur existe et que le mot de passe est correct mais que son compte n'est pas confirmé, retourner un message d'erreur
            $response_array['status'] = 'error';
            $response_array['message'] = 'Votre compte n\'a pas encore été confirmé. Veuillez vérifier votre boîte e-mail.';
            echo json_encode($response_array);
        }
    } else {
        // Si le mot de passe est incorrect, retourner un message d'erreur
        $response_array['status'] = 'error';
        $response_array['message'] = 'Le nom d\'utilisateur ou le mot de passe est incorrect.';
        echo json_encode($response_array);
    }
} else {
    // Si l'utilisateur n'existe pas, retourner un message d'erreur
    $response_array['status'] = 'error';
    $response_array['message'] = 'Le nom d\'utilisateur ou le mot de passe est incorrect.';
    echo json_encode($response_array);
}

// Fermer la connexion à la base de données
$stmt->close();
$conn->close();
?>
