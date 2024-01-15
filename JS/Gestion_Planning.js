document.addEventListener("DOMContentLoaded", function() { 
    // Récupération de l'ID et du nom de camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    var nom_camping = document.getElementById('campingForm').elements['camping_name'].value;

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