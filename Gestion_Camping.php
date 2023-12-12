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
     <!-- Planning bibliothèque fullcalendar-->
     <!-- CSS pour FullCalendar -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/primeng/9.0.6/resources/components/fullcalendar/fullcalendar.css">
     <!-- Scripts JS pour FullCalendar et ses dépendances -->
     <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>

</head>

<body>
    <!-- Formulaire caché pour récupérer l'ID et le nom du camping -->
    <form id="campingForm" method="POST" style="display: none;">
        <input type="hidden" name="id" id="campingId" value="<?php echo $campingId; ?>">
        <input type="hidden" name="camping_name" id="campingName" value="<?php echo $campingName; ?>">
    </form>
    <!-- ------------------------------------->

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
            <h2 id="planningTitle">Semaine du <span id="dateDebut"></span> au <span id="dateFin"></span></h2>
            <button id="addActivity">Ajouter une activité</button>
            <table id="planning-week"></table>
        </div>
    </div>

    
    <script>
        var campingId = "<?php echo $campingId; ?>";  // Variable JavaScript pour l'ID du camping
        var campingName = "<?php echo $campingName; ?>";  // Variable JavaScript pour le nom du camping
    </script>

    <script src="/JS/Gestion_Camping.js"></script>
</body>
</html>