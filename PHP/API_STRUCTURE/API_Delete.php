<?php
include '../config.php';

$id_structure = $_POST['id_structure'];

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $stmt = $conn->prepare("DELETE FROM STRUCTURE WHERE ID_STRUCTURE = :id_structure");
    $stmt->bindParam(':id_structure', $id_structure);
    $stmt->execute();

    echo "Deleted successfully";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage(); // Affichez l'erreur PDO
}
?>
