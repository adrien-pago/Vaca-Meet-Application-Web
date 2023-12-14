<?php
session_start();
$campingId = $_SESSION['camping_id'];  // Récupérez l'ID du camping depuis la session
$campingName = $_SESSION['camping_name'];  // Récupérez le nom du camping depuis la session
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des structures</title>
    <link rel="stylesheet" href="/CSS/Style_Gestion.css">
</head>

<body>
    <!-- Formulaire caché pour récupérer l'ID et le nom du camping -->
    <form id="campingForm" method="POST" style="display: none;">
        <input type="hidden" name="id" id="campingId" value="<?php echo $campingId; ?>">
        <input type="hidden" name="camping_name" id="campingName" value="<?php echo $campingName; ?>">
    </form>
    <!-- ------------------------------------->

    <!-- gérer le titre et la modification mdp vacancier -->
    <div class="Titre_Camping">
        <h1 id="Compte_Camping">Bienvenue au <span id="Nom_Camping"><?php echo htmlspecialchars($campingName); ?></span></h1>
        <button id="ComeBack" onclick="window.location.href='/index.php'">Déconnexion</button>
    </div>
    <div class="gestion_mdp_vacancier">
        <h1>Modifier le mot de passe de l'application mobil pour les vacanciers</h1>
        <button id="MDP_Vacancier">Modifier le mot de passe</button>
    </div>

    <!-- Fenêtre modale pour modifier le mot de passe des vacanciers -->
    <div id="modal_md_vacancier" class="modal" style="display:none;">
        <div class="modal-content">
            <h2>Modifier le mot de passe pour les vacanciers</h2>
            <input type="password" id="newPassword" placeholder="Nouveau mot de passe">
            <input type="password" id="confirmPassword" placeholder="Confirmer le mot de passe">
            <button id="Save_New_Mdp_Vacancier" onclick="updatePassword()">Valider</button>
            <button id="Close_Modal_mdp_Vacancier" onclick="closeModal()">Annuler</button>
        </div>
    </div>

    <!-- gérer les actifs -->
    <div class="gestion_tableau">
        <div class="structure" id="gestionStructure">
            <h1>Gestion structure</h1>
        </div>
        <div class="animation" id="gestionAnimation">
            <h1>Gestion activité </h1>
        </div>
        <div class="planning" id="gestionPlanning">
            <h1>Gestion planning</h1>
        </div>
    </div>
  
    <!-- gérer les structures -->
    <div id="tableau" style="display: none;">
    <button id="addRow">Rajouter une structure</button>
    <table>
        <thead>
            <tr>
                <th>ID Structure</th>
                <th>Camping</th>
                <th>Infrastructure</th>
                <th>Nombre</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <!-- Les lignes seront ajoutées dynamiquement ici -->
        </tbody>
    </table>
    </div>

     <!-- gérer les activité -->
    <div id="tableauAnimation" style="display: none;">
        <button id="addAnimation">Rajouter une activité </button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Libellé</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="tableBodyAnimation">
                <!-- Les lignes d'animation seront ajoutées dynamiquement ici -->
            </tbody>
        </table>
    </div>

   <!-- gérer le planning -->
    <div id="planning" style="display: none;">
        <div id="planningContainer">
                <div id="dateSelectors">
                    <label for="startDate">Date de début (Lundi)</label>
                    <input type="date" id="startDate" name="startDate">

                    <label for="endDate">Date de fin (Dimanche)</label>
                    <input type="date" id="endDate" name="endDate">

                    <button id="refreshPlanning">Rafraîchir le planning</button>
                </div>
                <div class="titre-planning">
                    <h2 id="planningTitle">Semaine du <span id="dateDebut"></span> au <span id="dateFin"></span></h2>
                    <button id="addActivity">Ajouter une activité</button>
                </div>
            <table id="planning-week">
                <!-- Les cellules du planning seront ajoutées dynamiquement ici -->
            </table>
        </div>
    </div>

    <!-- Fenêtre modale pour ajouter un événement dans le planning -->
    <div id="modalAddActivity" class="modal">
        <div class="modal-content">
            <h2>Ajout d'une activité</h2>
            <div class="select-group">
                <select id="activitySelect"></select>
                <select id="structureSelect"></select>
                <input type="datetime-local" id="startTime">
                <input type="datetime-local" id="endTime">
            </div>
            <div class="button-group">
                <button id="validateActivity">Valider</button>
                <button id="cancelActivity">Annuler</button>
            </div>
        </div>
    </div>

    <script>
        var campingId = "<?php echo $campingId; ?>";  // Variable JavaScript pour l'ID du camping
        var campingName = "<?php echo $campingName; ?>";  // Variable JavaScript pour le nom du camping
    </script>

    <script src="/JS/Gestion_Camping.js" ></script>

</body>
</html>