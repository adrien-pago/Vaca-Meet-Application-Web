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

    ///////////// Gestion Element Actif //////////////////////////////
    var gestionStructureBtn = document.getElementById('gestionStructure');
    var gestionAnimationBtn = document.getElementById('gestionAnimation');
    var gestionPlanningBtn = document.getElementById('gestionPlanning');
    var tableau = document.getElementById('tableau'); 
    var tableauAnimation = document.getElementById('tableauAnimation'); // Nouveau
    var planning = document.getElementById('planning'); 

    if (gestionStructureBtn && gestionAnimationBtn && gestionPlanningBtn && tableau && tableauAnimation && planning) {
        gestionStructureBtn.addEventListener('click', function() {
            tableau.style.display = 'block';
            tableauAnimation.style.display = 'none'; // Nouveau
            planning.style.display = 'none';
            this.classList.add('active');
            gestionAnimationBtn.classList.remove('active'); // Nouveau
            gestionPlanningBtn.classList.remove('active');
        });

        gestionAnimationBtn.addEventListener('click', function() { // Nouveau
            tableau.style.display = 'none';
            tableauAnimation.style.display = 'block'; // Nouveau
            planning.style.display = 'none';
            this.classList.add('active');
            gestionStructureBtn.classList.remove('active');
            gestionPlanningBtn.classList.remove('active');
        });

        gestionPlanningBtn.addEventListener('click', function() {
            tableau.style.display = 'none';
            tableauAnimation.style.display = 'none'; // Nouveau
            planning.style.display = 'block';
            this.classList.add('active');
            gestionStructureBtn.classList.remove('active');
            gestionAnimationBtn.classList.remove('active'); // Nouveau
        });
    } else {
        console.error('Un ou plusieurs éléments requis sont introuvables dans le DOM');
    }


    ////////////////////////////// Gestion Structure ///////////////////////////////////////////////////
    ////////////////////////////// Gestion Structure ///////////////////////////////////////////////////
// Récupère les informations du camping avec le bon ID
function fetchData() {
    fetch(`/PHP/API_STRUCTURE/API_Fetch.php?id_camping=${id_camping}`)
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
        <td><input type="number" placeholder="ID Structure" disabled></td>
        <td><input type="text" value="${nom_camping}" disabled></td>
        <td><input type="text" placeholder="Libellé de la structure"></td>
        <td><input type="number" placeholder="Nombre"></td>
        <td>
            <button class="save-new">✔️</button>
            <button class="cancel">❌</button>
        </td>
    `;
    tableBody.insertBefore(tr, tableBody.firstChild);
});

// Gestion des événements sur les boutons de chaque ligne du tableau
document.getElementById("tableBody").addEventListener("click", function(e) {
    var row = e.target.closest("tr"); // Cible la ligne la plus proche du bouton cliqué

    if (e.target.classList.contains("edit")) {
        // Stockage des valeurs originales dans des attributs pour une restauration éventuelle
        row.cells[1].dataset.originalValue = row.cells[1].textContent;
        row.cells[2].dataset.originalValue = row.cells[2].textContent;
        row.cells[3].dataset.originalValue = row.cells[3].textContent;

        // Remplacement du texte par des champs de saisie
        row.cells[1].innerHTML = `<input type="text" value="${row.cells[1].dataset.originalValue}" disabled />`;
        row.cells[2].innerHTML = `<input type="text" value="${row.cells[2].dataset.originalValue}" />`;
        row.cells[3].innerHTML = `<input type="number" value="${row.cells[3].dataset.originalValue}" />`;

        // Transformation du bouton "edit" en "save" et ajout d'un bouton "cancel"
        e.target.textContent = '✔️';
        e.target.classList.replace('edit', 'save');

        var cancelBtn = document.createElement("button");
        cancelBtn.textContent = '❌';
        cancelBtn.classList.add('cancel-edit');
        row.cells[4].appendChild(cancelBtn);

    } else if (e.target.classList.contains("save")) {
        // Récupération des nouvelles valeurs
        var new_libelle_structure = row.cells[2].querySelector("input").value;
        var new_nb_structure = row.cells[3].querySelector("input").value;
        var id_structure = row.cells[0].textContent;

        // Envoyez une requête AJAX pour mettre à jour les données
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/PHP/API_STRUCTURE/API_Update.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.responseText.trim() === 'Updated successfully') {
                // Mettez à jour le contenu textuel de la ligne avec les nouvelles valeurs
                row.cells[2].textContent = new_libelle_structure;
                row.cells[3].textContent = new_nb_structure;

                // Changez l'icône de sauvegarde en icône d'édition
                e.target.textContent = '🖉';
                e.target.classList.replace('save', 'edit');

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
        saveBtn.classList.replace('save', 'edit');

        // Supprimez le bouton d'annulation
        e.target.remove();

    } else if (e.target.classList.contains("delete")) {
        // Code pour supprimer la ligne
        var id_structure = row.cells[0].textContent;

        // Confirmez que l'utilisateur souhaite supprimer cette ligne
        var confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette structure ?');
        if (confirmDelete) {
            // Envoyez une requête AJAX pour supprimer la ligne
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/PHP/API_STRUCTURE/API_Delete.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
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
        // Récupérez les valeurs des champs de saisie
        var libelle_structure = row.cells[2].querySelector("input").value;
        var nb_structure = row.cells[3].querySelector("input").value;

        // Envoyez une requête AJAX pour insérer les données
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/PHP/API_STRUCTURE/API_Insert.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.responseText.trim() === 'Inserted successfully') {
                fetchData(); // Rechargez les données pour mettre à jour le tableau
            } else {
                console.error('Erreur lors de linsertion :', xhr.responseText);
            }
        };
        xhr.send(`libelle_structure=${encodeURIComponent(libelle_structure)}&nb_structure=${encodeURIComponent(nb_structure)}&id_camping=${encodeURIComponent(id_camping)}`);
        row.remove(); // Supprimez la ligne après insertion

    } else if (e.target.classList.contains("cancel")) {
        // Supprimez simplement la ligne parente
        row.remove();
    }
});

    ///////////////////////////////// Gestion Activité ///////////////////////////////////////
    function fetchActivities() {
        fetch(`/PHP/API_ACTIVITE/API_Fetch.php?id_camping=${id_camping}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau ou serveur');
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("tableBodyAnimation");
            tableBody.innerHTML = "";
            data.forEach(row => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.ID_ACTIVITE}</td>
                    <td>${row.LIBELLE_ACT}</td>
                    <td>
                        <button class="edit">🖉</button>
                        <button class="delete">🗑️</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des activités :', error);
        });
    }

    fetchActivities();

    // Ajout d'une nouvelle activité au tableau
    var addButton = document.getElementById("addAnimation");
    if (addButton) {
        addButton.addEventListener("click", function() {
            console.log("Bouton 'Ajouter une activité' cliqué");
            let tableBody = document.getElementById("tableBodyAnimation");
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td><input type="number" placeholder="ID" disabled></td>
                <td><input type="text" placeholder="Libellé de l'activité"></td>
                <td>
                    <button class="save-new">✔️</button>
                    <button class="cancel">❌</button>
                </td>
            `;
            tableBody.insertBefore(tr, tableBody.firstChild);
        });
    } else {
        console.log("Le bouton 'Ajouter une activité' n'a pas été trouvé");
    }

    // Gestion des événements sur les boutons de chaque ligne du tableau des activités
    document.getElementById("tableBodyAnimation").addEventListener("click", function(e) {
        var row = e.target.closest("tr");

        if (e.target.classList.contains("edit")) {
            // Stockez les valeurs originales dans des attributs de données
            row.cells[1].dataset.originalValue = row.cells[1].textContent;

            // Remplacez le contenu textuel par des champs de saisie
            row.cells[1].innerHTML = `<input type="text" value="${row.cells[1].dataset.originalValue}" />`;

            // Ajout d'un bouton de sauvegarde 
            e.target.textContent = '✔️';
            e.target.classList.remove('edit');
            e.target.classList.add('save');

            // Ajout d'un bouton d'annulation 
            var cancelBtn = document.createElement("button");
            cancelBtn.textContent = '❌';
            cancelBtn.classList.add('cancel-edit');
            row.cells[2].appendChild(cancelBtn);

        } else if (e.target.classList.contains("save")) {
            // Obtenez les nouvelles valeurs des champs de saisie
            var new_libelle_act = row.cells[1].querySelector("input").value;
            var id_activite = row.cells[0].textContent;

            // Envoyez une requête AJAX pour mettre à jour les données
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/PHP/API_ACTIVITE/API_Update.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.responseText.trim() === 'Updated successfully') {
                    // Mettez à jour le contenu textuel de la ligne avec les nouvelles valeurs
                    row.cells[1].textContent = new_libelle_act;

                    // Changez l'icône de sauvegarde en icône d'édition
                    e.target.textContent = '🖉';
                    e.target.classList.remove('save');
                    e.target.classList.add('edit');

                    // Supprimez le bouton d'annulation
                    var cancelBtn = row.cells[2].querySelector('.cancel-edit');
                    if (cancelBtn) {
                        cancelBtn.remove();
                    }
                    
                } else {
                    console.error('Erreur lors de la mise à jour :', xhr.responseText);
                }
            };
            xhr.send(`id_activite=${encodeURIComponent(id_activite)}&libelle_act=${encodeURIComponent(new_libelle_act)}&id_camping=${encodeURIComponent(id_camping)}`);


        } else if (e.target.classList.contains("cancel-edit")) {
            // Restaurez le contenu textuel original des cellules depuis les attributs de données
            row.cells[1].textContent = row.cells[1].dataset.originalValue;
            
            // Changez l'icône de sauvegarde en icône d'édition
            var saveBtn = row.cells[2].querySelector('.save');
            saveBtn.textContent = '🖉';
            saveBtn.classList.remove('save');
            saveBtn.classList.add('edit');
            
            // Supprimez le bouton d'annulation
            e.target.remove();

        } else if (e.target.classList.contains("delete")) {
            // Code pour supprimer la ligne
            var id_activite = row.cells[0].textContent;

            // Confirmez que l'utilisateur souhaite supprimer cette ligne
            var confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette activité ?');
            if (confirmDelete) {
                // Envoyez une requête AJAX pour supprimer la ligne
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/PHP/API_ACTIVITE/API_Delete.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onload = function () {
                    if (xhr.status === 200 && xhr.responseText.trim() === 'Deleted successfully') {
                        // Supprimez la ligne du tableau si la suppression a réussi
                        row.remove();
                    } else {
                        console.error('Erreur lors de la suppression :', xhr.responseText);
                    }
                };
                xhr.send(`id_activite=${id_activite}`);
            }
           
        } else if (e.target.classList.contains("save-new")) {
            // Obtenez les valeurs des champs de saisie
            var libelle_act = row.cells[1].querySelector("input").value;

            // Envoyez une requête AJAX pour insérer les données
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/PHP/API_ACTIVITE/API_Insert.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.responseText.trim() === 'Inserted successfully') {
                    // Rechargez les données ou mettez à jour la table comme vous le souhaitez
                    fetchActivities();
                } else {
                    console.error('Erreur insertion :', xhr.responseText);
                }
            };
            var data = `libelle_act=${libelle_act}&id_camping=${id_camping}`;
            xhr.send(data);

        } else if (e.target.classList.contains("cancel")) {
            // Supprimez simplement la ligne parente
            var rowToRemove = e.target.closest("tr");
            rowToRemove.remove();
        }
    });



   ///////////////////////////////////// Gestion Planning /////////////////////////////////////////////////
    // Fonction pour obtenir le lundi et le dimanche de la semaine actuelle
function getWeekStartAndEndDates() {
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        // Si aucune date n'est sélectionnée, définissez les dates par défaut pour la semaine en cours
        let currentDate = new Date();
        let currentDay = currentDate.getDay();
        let dayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Ajuster au lundi précédent
        let monday = new Date(currentDate);
        monday.setDate(monday.getDate() + dayOffset);
        let sunday = new Date(monday);
        sunday.setDate(sunday.getDate() + 6);

        startDate = monday.toISOString().split('T')[0];
        endDate = sunday.toISOString().split('T')[0];

        // Mettre à jour les champs de date
        document.getElementById('startDate').value = startDate;
        document.getElementById('endDate').value = endDate;
    }

    return {
        dateDebut: startDate,
        dateFin: endDate
    };
}

    // Événement pour rafraîchir le planning avec les nouvelles dates
    document.getElementById('refreshPlanning').addEventListener('click', function() {
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;

        if (!startDate || !endDate) {
            alert("Veuillez sélectionner les dates de début et de fin.");
            return;
        }

        let startDay = new Date(startDate).getDay();
        let endDay = new Date(endDate).getDay();

        // Vérifier que la date de début est un lundi
        if (startDay !== 1) {
            alert("La date de début doit être un lundi.");
            return;
        }

        // Calculer le dimanche de la même semaine que la date de début
        let expectedSunday = new Date(startDate);
        expectedSunday.setDate(expectedSunday.getDate() + 6);
        let expectedSundayString = expectedSunday.toISOString().split('T')[0];

        // Vérifier que la date de fin est le dimanche de la même semaine que la date de début
        if (endDate !== expectedSundayString) {
            alert("La date de fin doit être le dimanche de la même semaine que la date de début.");
            return;
        }

        loadAndDisplayPlanning();
        });

    // Fonction pour créer l'en-tête et le corps du tableau de planning
    function createTableStructure(planningWeek) {
        let plagesHoraires = ["8h-10h", "10h-12h", "12h-14h", "14h-16h", "16h-18h", "18h-20h", "20h-22h", "22h-24h"];
        let jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

        // Créer l'en-tête du tableau
        let thead = planningWeek.createTHead();
        let headerRow = thead.insertRow();
        headerRow.insertCell().textContent = "Plage horaire / Jour";
        jours.forEach(jour => {
            headerRow.insertCell().textContent = jour;
        });

        // Créer le corps du tableau
        let tbody = planningWeek.createTBody();
        plagesHoraires.forEach(plageHoraire => {
            let row = tbody.insertRow();
            row.classList.add("data-row");
            row.insertCell().textContent = plageHoraire;
            jours.forEach(() => {
                row.insertCell().textContent = "";
            });
        });
    }

    // Fonction pour charger et afficher le planning
    function loadAndDisplayPlanning() {
        let { dateDebut, dateFin } = getWeekStartAndEndDates();
        document.getElementById('dateDebut').textContent = dateDebut;
        document.getElementById('dateFin').textContent = dateFin;
        let planningWeek = document.getElementById("planning-week");
        planningWeek.innerHTML = "";

        createTableStructure(planningWeek);

        // Appel AJAX pour récupérer les activités
        fetch(`/PHP/API_PLANNING/API_Fetch.php?id_camping=${campingId}&dateDebut=${dateDebut}&dateFin=${dateFin}`)
            .then(response => response.json())
            .then(events => {
                events.forEach(event => {
                    insertEventInPlanning(event);
                });
            });
    }

    // Fonction pour insérer un événement dans le planning
    function insertEventInPlanning(event) {
        let debut = new Date(event.DATE_HEURE_DEBUT);
        let fin = new Date(event.DATE_HEURE_FIN);
        let heureDebut = debut.getHours();
        let heureFin = fin.getHours();
        let jour = debut.getDay();

        let jourIndex = jour === 0 ? 7 : jour;
        let rowIndexDebut = Math.floor((heureDebut - 8) / 2) + 1;
        let rowIndexFin = Math.floor((heureFin - 8) / 2) + 1;
        let colIndex = jourIndex + 1;

        if (!isNaN(rowIndexDebut) && !isNaN(colIndex)) {
            for (let rowIndex = rowIndexDebut; rowIndex <= rowIndexFin; rowIndex++) {
                let cellSelector = `#planning-week tbody .data-row:nth-child(${rowIndex}) td:nth-child(${colIndex})`;
                let cell = document.querySelector(cellSelector);
                if (cell) {
                    cell.textContent += event.LIB_ACTIVITE + ' ';
                } else {
                    console.error("Cellule introuvable avec le sélecteur:", cellSelector);
                }
            }
        } else {
            console.error("Indices invalides pour rowIndex ou colIndex");
        }
    }

     
   
    ///////////////////////////////// Fenetre Modal pour ajout d'évènement dans le planning /////////////////////////////////////////
    //récupérer la liste des activité dans une combo
    function fetchActivitiesForSelect() {
        fetch(`/PHP/API_PLANNING/API_Libelle_Activite.php?id_camping=${campingId}`)
            .then(response => response.json())
            .then(activities => {
                let activitySelect = document.getElementById("activitySelect");
                activitySelect.innerHTML = ""; // Nettoyer la liste déroulante avant de la remplir
    
                activities.forEach(activity => {
                    let option = document.createElement("option");
                    option.value = activity.LIBELLE_ACT;
                    option.textContent = activity.LIBELLE_ACT;
                    activitySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des activités :', error);
            });
    }
    //récupérer la liste des structure dans une combo
    function fetchStructuresForSelect() {
        fetch(`/PHP/API_PLANNING/API_Libelle_Structure.php?id_camping=${campingId}`)
            .then(response => response.json())
            .then(structures => {
                let structureSelect = document.getElementById("structureSelect");
                structureSelect.innerHTML = ""; 
                structures.forEach(structure => {
                    let option = document.createElement("option");
                    option.value = structure.ID_STRUCTURE; // Utilisez l'ID pour l'insertion
                    option.textContent = structure.LIBELLE_STRUCTURE;
                    structureSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des structures :', error);
            });
    }

    // Ouverture de la fenêtre modale
    document.getElementById("addActivity").addEventListener("click", function() {
        fetchActivitiesForSelect();
        fetchStructuresForSelect();
        document.getElementById("modalAddActivity").style.display = "block";
    });

    // Écouteur pour le bouton de validation dans la fenêtre modale
    document.getElementById("validateActivity").addEventListener("click", function() {
        let selectedActivity = document.getElementById("activitySelect").value;
        let selectedStructureId = document.getElementById("structureSelect").value;
        let startTime = document.getElementById("startTime").value;
        let endTime = document.getElementById("endTime").value;

        fetch('/PHP/API_PLANNING/API_Insert.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `lib_activite=${encodeURIComponent(selectedActivity)}&id_structure=${encodeURIComponent(selectedStructureId)}&dateHeureDebut=${encodeURIComponent(startTime)}&dateHeureFin=${encodeURIComponent(endTime)}&id_camping=${encodeURIComponent(campingId)}`
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            document.getElementById("modalAddActivity").style.display = "none";
            loadAndDisplayPlanning(); // Recharger le planning pour afficher le nouvel événement
        })
        .catch(error => {
            console.error('Erreur lors de linsertion :', error);
        });
    });

    // Fermeture de la fenêtre modale
    document.getElementById("cancelActivity").addEventListener("click", function() {
        document.getElementById("modalAddActivity").style.display = "none";
    });
});





