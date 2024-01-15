document.addEventListener("DOMContentLoaded", function() {
    // Récupération de l'ID et du nom de camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    var nom_camping = document.getElementById('campingForm').elements['camping_name'].value;

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
                tr.setAttribute("data-id-structure", row.ID_STRUCTURE); // Stockez l'ID_STRUCTURE en tant qu'attribut de données
                tr.innerHTML = `
                    <td class="hidden_Id">${row.ID_STRUCTURE}</td>
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
            var id_structure = row.getAttribute("data-id-structure"); // Récupération de l'ID_STRUCTURE à partir de l'attribut de données

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
            var id_structure = row.getAttribute("data-id-structure"); // Récupération de l'ID_STRUCTURE à partir de l'attribut de données

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
            var libelle_structure = row.cells[1].querySelector("input").value;
            var nb_structure = row.cells[2].querySelector("input").value;

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
            var rowToRemove = e.target.closest("tr");
            rowToRemove.remove();
        }

    });
});
