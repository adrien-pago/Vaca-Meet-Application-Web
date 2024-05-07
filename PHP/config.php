<?php
// Configuration de la base de données
const SERVERNAME = "localhost";
const DBNAME = "APPLICATION_CAMPING";
const DBUSERNAME = "adrien_camping";
const DBPASSWORD = "c42xP_4u1";

$conn = new mysqli(SERVERNAME, DBUSERNAME, DBPASSWORD, DBNAME);
if ($conn->connect_error) {
   die("La connexion à la base de données a échoué : " . $conn->connect_error);
}
?>
