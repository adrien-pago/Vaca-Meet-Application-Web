<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

set_include_path(get_include_path() . PATH_SEPARATOR . '/var/www/vhosts/pago-family-games.com/httpdocs/vendor');

//error_log('Erreur lors de l\'envoi du message.');
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    $response_array['status'] = 'error';
    $response_array['message'] = 'Méthode de requête non autorisée.';
    echo json_encode($response_array);
    die();
    exit();
}
// indiquer explicitement que la réponse est de type JSON.
header('Content-Type: application/json');

// Inclure PHPMailer dans votre script
require_once __DIR__ . '/../vendor/autoload.php';

// Importer PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Initialiser la variable $response_array
$response_array = array();

// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}
// Récupérer les données du formulaire + vérifier  champ !!!!!!!! + prévoir htacces !!!!
$email = $_POST['email'];
$NomCamping = $_POST['NomCamping'];
$NumeroSiret = $_POST['NumSiretC'];
$password = $_POST['password'];

// Vérifier si l'adresse email est déjà utilisé dans la base de données
$sql = "SELECT * FROM CAMPING WHERE EMAIL='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Si l'adresse email existe déjà, retourner un message d'erreur
    $response_array['status'] = 'error';
    $response_array['message'] = 'Cette adresse e-mail est déja utilisé';
    echo json_encode($response_array);
    die();
    exit();
}

// Vérifier si L'userName  est déjà utilisé dans la base de données
$sql = "SELECT * FROM CAMPING WHERE NOM_CAMPING='$NomCamping'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // L'UserName existe déjà, retourner un message d'erreur
    $response_array['status'] = 'error';
    $response_array['message'] = 'Ce nom de camping est déjà utilisé';
    echo json_encode($response_array);
    die();
    exit();
}

// Hasher le mot de passe avec l'algorithme bcrypt
$hashed_password = password_hash($password, PASSWORD_BCRYPT);
// Générer un jeton de confirmation aléatoire
$confirm_token = bin2hex(random_bytes(32));
//Lien de confirmation
$base_url = "http://vaca-meet.fr"; // votre domaine actuel.
$confirmation_link = $base_url . '/PHP/confirm_Token.php?token=' . $confirm_token;


// Envoyer un e-mail de confirmation
$mail = new PHPMailer(true);
$mail->SMTPDebug = 0; // Désactiver le débogage SMTP
try {
    // Configurer les paramètres du serveur SMTP
    $mail->isSMTP();                                     
    $mail->Host = 'smtp.ionos.fr';                      
    $mail->SMTPAuth = true;                              
    $mail->Username = 'adrien-pago@vaca-meet.fr'; 
    $mail->Password = 'RG3SrzY7PhvnWQh';              
    $mail->SMTPSecure = 'tls';                           
    $mail->Port = 587;

  
    // Configurer les paramètres de l'e-mail
    $mail->setFrom('adrien-pago@vaca-meet.fr', 'Support Technique');
    $mail->addAddress($email);
    $mail->isHTML(true);

    $mail->Subject = 'Confirmez votre compte';
    $mail->Body    = 'Bienvenue sur notre application Camping! Veuillez cliquer sur le lien suivant pour confirmer votre compte : <a href="' . $confirmation_link . '">Confirmer mon compte</a>';

     // Envoyer l'e-mail
     $mail->send();
 }  catch (Exception $e) {
    $response_array['status'] = 'error';
    $response_array['message'] = "Le message n'a pas pu être envoyé. Erreur : {$mail->ErrorInfo}";
    echo json_encode($response_array);
    die();
    exit();
}

 
// Insérer les données dans la base de données
$sql = "INSERT INTO CAMPING (NOM_CAMPING, EMAIL, NUM_SIRET, MAP, PASSWORD,  TOKEN_CONFIRM) VALUES ('$NomCamping','$email', '$NumeroSiret', '',  '$hashed_password' , '$confirm_token')";
if ($conn->query($sql) === TRUE) {
    // Si l'insertion est réussie, retourner un message de succès
    $response_array['status'] = 'success';
    $response_array['message'] = 'Votre compte a été enregistré avec succès. Veuillez finir la validation de votre compte en cliquant sur le lien que nous avons envoyé à votre adresse e-mail.';
    echo json_encode($response_array);
    die();
    exit();
} else {
    $response_array['db_error'] = $conn->error;
    // Sinon, retourner un message d'erreur
    $response_array['status'] = 'error';
    $response_array['message'] = "Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer.";
    echo json_encode($response_array);
    die();
    exit();
}

// Fermer la connexion à la base de données
$conn->close();
?>
