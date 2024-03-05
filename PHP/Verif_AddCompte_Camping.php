<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

set_include_path(get_include_path() . PATH_SEPARATOR . '/var/www/vhosts/pago-family-games.com/httpdocs/vendor');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    $response_array['status'] = 'error';
    echo json_encode($response_array);
    die();
}

header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response_array = array();
require_once 'config.php';

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

$email = $_POST['email'];
$NomCamping = $_POST['NomCamping'];
$NumeroSiret = $_POST['NumSiretC'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM CAMPING WHERE EMAIL = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Cette adresse e-mail est déjà utilisée']);
    $stmt->close();
    $conn->close();
    die();
}

$stmt = $conn->prepare("SELECT * FROM CAMPING WHERE NOM_CAMPING = ?");
$stmt->bind_param("s", $NomCamping);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Ce nom de camping est déjà utilisé']);
    $stmt->close();
    $conn->close();
    die();
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$confirm_token = bin2hex(random_bytes(32));
$base_url = "http://vaca-meet.fr";
$confirmation_link = $base_url . '/PHP/confirm_Token.php?token=' . $confirm_token;

$mail = new PHPMailer(true);
$mail->SMTPDebug = 2; // Active le mode débogage SMTP
try {
    $mail->isSMTP();                                     
    $mail->Host = 'smtp.ionos.fr';                      
    $mail->SMTPAuth = true;                              
    $mail->Username = 'support-technique@vaca-meet.fr'; 
    $mail->Password = 'Support-AntiHackMessagerie489?';              
    $mail->SMTPSecure = 'tls';                           
    $mail->Port = 587; 
  
    $mail->setFrom('adrien-pago@vaca-meet.fr', 'Support Technique');
    $mail->addAddress($email);
    $mail->isHTML(true);

    $mail->Subject = 'Confirmez votre compte';
    $mail->Body    = 'Bienvenue sur notre application Camping! Veuillez cliquer sur le lien suivant pour confirmer votre compte : <a href="' . $confirmation_link . '">Confirmer mon compte</a>';

    $mail->send();

    $stmt = $conn->prepare("INSERT INTO CAMPING (NOM_CAMPING, EMAIL, NUM_SIRET, PASSWORD, TOKEN_CONFIRM) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $NomCamping, $email, $NumeroSiret, $hashed_password, $confirm_token);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Votre compte a été enregistré avec succès. Veuillez finir la validation de votre compte en cliquant sur le lien que nous avons envoyé à votre adresse e-mail.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => "Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer."]);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Une erreur s'est produite lors de l'envoi de l'e-mail de confirmation. Veuillez réessayer. Erreur : " . $mail->ErrorInfo]);
}

$stmt->close();
$conn->close();
?>
