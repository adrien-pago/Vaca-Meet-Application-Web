document.addEventListener("DOMContentLoaded", function() {
<<<<<<< HEAD

    // Récupération de l'ID du camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    console.log(id_camping); // Affiche l'ID_CAMPING dans la console pour debug

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

=======
    // Remplacez cette valeur par l'ID_CAMPING récupéré lors de la connexion
    const id_camping = "VOTRE_ID_CAMPING";

    function fetchData() {
        fetch(`fetchData.php?id_camping=${id_camping}`)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = "";
>>>>>>> f051e1761a7f25637fcc9dbeb025f303695b222a
            data.forEach(row => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="hidden">${row.ID_STRUCTURE}</td>
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
<<<<<<< HEAD
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
=======
>>>>>>> f051e1761a7f25637fcc9dbeb025f303695b222a
        });
    }

    fetchData();

<<<<<<< HEAD
    // Ajout d'une nouvelle ligne au tableau pour une entrée
=======
>>>>>>> f051e1761a7f25637fcc9dbeb025f303695b222a
    document.getElementById("addRow").addEventListener("click", function() {
        let tableBody = document.getElementById("tableBody");
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="hidden"></td>
            <td><input type="text" placeholder="Nom"></td>
            <td><input type="text" placeholder="Infrastructure"></td>
            <td><input type="number" placeholder="Nombre"></td>
            <td>
                <button class="save">✔️</button>
                <button class="cancel">❌</button>
            </td>
        `;
        tableBody.insertBefore(tr, tableBody.firstChild);
    });

<<<<<<< HEAD
    // Gestion des événements sur les boutons de chaque ligne du tableau
=======
>>>>>>> f051e1761a7f25637fcc9dbeb025f303695b222a
    document.getElementById("tableBody").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            // Code pour éditer la ligne
        } else if (e.target.classList.contains("delete")) {
            // Code pour supprimer la ligne
        } else if (e.target.classList.contains("save")) {
            // Code pour sauvegarder la nouvelle ligne
        } else if (e.target.classList.contains("cancel")) {
            // Code pour annuler l'ajout de la nouvelle ligne
        }
    });
});
