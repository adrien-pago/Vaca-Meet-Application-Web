<?php
   include 'config.php';
   
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $campingId = isset($_POST['campingId']) ? $_POST['campingId'] : '';
        $newPassword = isset($_POST['newPassword']) ? $_POST['newPassword'] : '';

        // Validation des données reçues
        if (empty($campingId) || empty($newPassword)) {
            exit('Données manquantes');
        }

        
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Mise à jour du mot de passe
            $stmt = $conn->prepare("UPDATE CAMPING SET MDP_VACANCIER = :newPassword WHERE ID_CAMPING = :idCamping");
            $stmt->bindParam(':newPassword', $newPassword, PDO::PARAM_STR);
            $stmt->bindParam(':idCamping', $campingId, PDO::PARAM_INT);
            $stmt->execute();

            echo "Mot de passe mis à jour avec succès.";
    }
?>
