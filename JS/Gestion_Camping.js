document.addEventListener("DOMContentLoaded", function() {

    // Récupération de l'ID du camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    console.log(id_camping); // Affiche l'ID_CAMPING dans la console pour debug

    // Récupération de l'ID du camping depuis le formulaire
    var nom_camping = document.getElementById('campingForm').elements['camping_name'].value; 
    console.log(nom_camping); // Affiche l'ID_CAMPING dans la console pour debug

    // Vérifiez si id_camping est non vide
    if (!id_camping) {
        console.error('ID du camping est vide');
        return;
    }


    // Récupère les informations du camping avec le bon ID
    function fetchData() {
        fetch(`/PHP/API_Fetch.php?id_camping=${id_camping}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau ou serveur');
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = "";

            data.forEach(row => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.ID_STRUCTURE}</td>
                    <td>${row.NOM_CAMPING}</td>
                    <td>${row.LIBELLE_STRUCTURE}</td>
                    <td>${row.NB_STRUCTURE}</td>
                    <td>
                        <button class="edit">🖉</button>
                        <button class="delete">🗑️</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
    }

    fetchData();

    // Ajout d'une nouvelle ligne au tableau pour une entrée
    document.getElementById("addRow").addEventListener("click", function() {
        let tableBody = document.getElementById("tableBody");
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="number" placeholder="Nombre" disabled></td> <!-- Champ grisé -->
            <td><input type="text" value="${nom_camping}" disabled></td> <!-- Champ grisé avec nom du camping -->
            <td><input type="text" placeholder="Infrastructure"></td>
            <td><input type="number" placeholder="Nombre"></td>
            <td>
                <button class="save-new">✔️</button> <!-- Classe modifiée pour distinguer ce bouton save -->
                <button class="cancel">❌</button>
            </td>
        `;
        tableBody.insertBefore(tr, tableBody.firstChild);
    });

    
    // Gestion des événements sur les boutons de chaque ligne du tableau
    document.getElementById("tableBody").addEventListener("click", function(e) {
    var row = e.target.closest("tr"); // Ajout de la variable row pour index les ligne

        if (e.target.classList.contains("edit")) {
         // Stockez les valeurs originales dans des attributs de données
        row.cells[1].dataset.originalValue = row.cells[1].textContent;
        row.cells[2].dataset.originalValue = row.cells[2].textContent;
        row.cells[3].dataset.originalValue = row.cells[3].textContent;

        // Remplacez le contenu textuel par des champs de saisie
        row.cells[1].innerHTML = `<input type="text" value="${row.cells[1].dataset.originalValue}" disabled />`;
        row.cells[2].innerHTML = `<input type="text" value="${row.cells[2].dataset.originalValue}" />`;
        row.cells[3].innerHTML = `<input type="number" value="${row.cells[3].dataset.originalValue}" />`;
        
        //  Ajout d'un bouton de sauvegarde 
        e.target.textContent = '✔️';
        e.target.classList.remove('edit');
        e.target.classList.add('save');

        // Ajout d'un bouton d'annulation 
        var cancelBtn = document.createElement("button");
        cancelBtn.textContent = '❌';
        cancelBtn.classList.add('cancel-edit');
        row.cells[4].appendChild(cancelBtn);

    } else if (e.target.classList.contains("save")) {
        // Obtenez les nouvelles valeurs des champs de saisie
        var new_libelle_structure = row.cells[2].querySelector("input").value;
        var new_nb_structure = row.cells[3].querySelector("input").value;
        var id_structure = row.cells[0].textContent;
        // Ajout de l'id_camping à la requête
        var id_camping = document.getElementById('campingForm').elements['id'].value;

        // Envoyez une requête AJAX pour mettre à jour les données
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/PHP/API_Update.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === 'Updated successfully') {
                // Mettez à jour le contenu textuel de la ligne avec les nouvelles valeurs
                row.cells[2].textContent = new_libelle_structure;
                row.cells[3].textContent = new_nb_structure;

                // Changez l'icône de sauvegarde en icône d'édition
                e.target.textContent = '🖉';
                e.target.classList.remove('save');
                e.target.classList.add('edit');

                // Supprimez le bouton d'annulation
                var cancelBtn = row.cells[4].querySelector('.cancel-edit');
                if (cancelBtn) {
                    cancelBtn.remove();
                }
                
            } else {
                console.error('Erreur lors de la mise à jour :', xhr.responseText);
            }
        };
        xhr.send(`id_camping=${id_camping}&id_structure=${id_structure}&libelle_structure=${new_libelle_structure}&nb_structure=${new_nb_structure}`);

    } else if (e.target.classList.contains("cancel-edit")) {
        // Restaurez le contenu textuel original des cellules depuis les attributs de données
        row.cells[1].textContent = row.cells[1].dataset.originalValue;
        row.cells[2].textContent = row.cells[2].dataset.originalValue;
        row.cells[3].textContent = row.cells[3].dataset.originalValue;
        
        // Changez l'icône de sauvegarde en icône d'édition
        var saveBtn = row.cells[4].querySelector('.save');
        saveBtn.textContent = '🖉';
        saveBtn.classList.remove('save');
        saveBtn.classList.add('edit');
        
        // Supprimez le bouton d'annulation
        e.target.remove();

    } else if (e.target.classList.contains("delete")) {
        // Code pour supprimer la ligne
        // Obtenez l'ID de la structure de la ligne à supprimer
        var id_structure = row.cells[0].textContent;
        var id_camping = document.getElementById('campingForm').elements['id'].value;

        // Confirmez que l'utilisateur souhaite supprimer cette ligne
        var confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette structure ?');
        if (confirmDelete) {
            // Envoyez une requête AJAX pour supprimer la ligne
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/PHP/API_Delete.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.responseText.trim() === 'Deleted successfully') {
                    // Supprimez la ligne du tableau si la suppression a réussi
                    row.remove();
                } else {
                    console.error('Erreur lors de la suppression :', xhr.responseText);
                }
            };
            xhr.send(`id_structure=${id_structure}&id_camping=${id_camping}`);
        }
           
    } else if (e.target.classList.contains("save-new")) {
        // Obtenez les valeurs des champs de saisie
        var libelle_structure = row.cells[2].querySelector("input").value;
        var nb_structure = row.cells[3].querySelector("input").value;
        var id_camping_input = document.getElementById('campingId');  // Récupérez l'élément d'input de l'ID du camping
        var id_camping = id_camping_input.value;  // Obtenez la valeur de l'ID du camping
        
        // Envoyez une requête AJAX pour insérer les données
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/PHP/API_Insert.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === 'Inserted successfully') {
                // Rechargez les données ou mettez à jour la table comme vous le souhaitez
                fetchData();
            } else {
                console.error('Erreur lors de linsertion :', xhr.responseText);
            }
        };
        // Incluez l'ID du camping dans les données à envoyer
        var data = `libelle_structure=${libelle_structure}&nb_structure=${nb_structure}&id_camping=${id_camping}`;
        xhr.send(data);

    } else if (e.target.classList.contains("cancel")) {
        // Supprimez simplement la ligne parente
        var rowToRemove = e.target.closest("tr");
        rowToRemove.remove();
        }
        
    });

    ///////////// Gestion Element Actif //////////////////////////////
     var gestionStructureBtn = document.getElementById('gestionStructure');
     var gestionPlanningBtn = document.getElementById('gestionPlanning');
     var tableau = document.getElementById('tableau'); 
     var planning = document.getElementById('planning'); 
 
     if (gestionStructureBtn && gestionPlanningBtn && tableau && planning) {
         gestionStructureBtn.addEventListener('click', function() {
             console.log('Gestion Structure clicked');
             tableau.style.display = 'block';
             planning.style.display = 'none';
             this.classList.add('active');
             gestionPlanningBtn.classList.remove('active');
         });
 
         gestionPlanningBtn.addEventListener('click', function() {
             console.log('Gestion Planning clicked');
             tableau.style.display = 'none';
             planning.style.display = 'block';
             this.classList.add('active');
             gestionStructureBtn.classList.remove('active');
         });
     } else {
         console.error('Un ou plusieurs éléments requis sont introuvables dans le DOM');
     }

     ////////////////////PLanning/////////////////////////
     $(document).ready(function() {
        // Initialiser le calendrier
        $('#calendar').fullCalendar({
            defaultView: 'agendaWeek', // Définir la vue par semaine par défaut
            slotDuration: '00:30:00', // Durée de chaque intervalle (30 minutes)
            slotLabelInterval: '01:00:00', // Fréquence d'affichage des étiquettes d'heure (1 heure)
            
            // Augmenter la hauteur des lignes
            slotLabelFormat: {
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'short'
            },
            // Configuration du calendrier
            // ...
    
            // Charger des événements depuis la base de données
            events: [
                {
                    title: 'Événement 1',
                    start: '2023-11-15',
                    end: '2023-11-16',
                    description: 'Description de l\'événement 1',
                },
                {
                    title: 'Événement 2',
                    start: '2023-11-20',
                    end: '2023-11-22',
                    description: 'Description de l\'événement 2',
                },
                // Ajoutez d'autres événements ici en récupérant les données depuis votre base de données
            ],
            
            eventClick: function(event) {
                // Action à effectuer lorsque l'utilisateur clique sur un événement
                alert('Titre : ' + event.title + '\nDescription : ' + event.description);
            }
        });
    });
 });




