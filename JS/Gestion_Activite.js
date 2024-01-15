document.addEventListener("DOMContentLoaded", function() {     
    // Récupération de l'ID et du nom de camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    var nom_camping = document.getElementById('campingForm').elements['camping_name'].value;

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
                    <td class="hidden_Id">${row.ID_ACTIVITE}</td>
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

        addButton.addEventListener("click", function() {
            let tableBody = document.getElementById("tableBodyAnimation");
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td><input type="text" placeholder="Libellé de l'activité"></td>
                <td>
                    <button class="save-new">✔️</button>
                    <button class="cancel">❌</button>
                </td>
            `;
            tableBody.insertBefore(tr, tableBody.firstChild);
        });
  
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
            var libelle_act = row.cells[0].querySelector("input").value;

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
    })