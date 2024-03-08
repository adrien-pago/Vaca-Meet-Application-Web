<?php
   require_once 'config.php';
   
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $campingId = isset($_POST['campingId']) ? $_POST['campingId'] : '';
        $newPassword = isset($_POST['newPassword']) ? $_POST['newPassword'] : '';

        // Validation des données reçues
        if (empty($campingId) || empty($newPassword)) {
            exit('Données manquantes');
        }

        // Mise à jour du mot de passe
        $stmt = $conn->prepare("UPDATE CAMPING SET MDP_VACANCIER = :newPassword WHERE ID_CAMPING = :idCamping");
        $stmt->bindParam("s",':newPassword', $newPassword);
        $stmt->bindParam("i",':idCamping', $campingId);
        $stmt->execute();

        echo "Mot de passe mis à jour avec succès.";
    }

$stmt->close();
$conn->close();
?>
