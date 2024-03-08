document.addEventListener("DOMContentLoaded", function() {     
    // Récupération de l'ID et du nom de camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 

    // Fonction pour récupérer les détails du compte camping
    function fetchCompteDetails() {
        var formData = new FormData();
        formData.append('id_camping', id_camping);

        fetch('./PHP/API_GESTION_COMPTE/API_Fetch.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.ok ? response.json() : Promise.reject('Réponse réseau non ok'))
        .then(data => {
            if (data.length > 0) {
                document.getElementById('NumeroSiretCompte').value = data[0].NUM_SIRET || '';
                document.getElementById('EmailCompte').value = data[0].EMAIL || '';
                document.getElementById('NomCampingCompte').value = data[0].NOM_CAMPING || '';
            } else {
                console.error('Aucune donnée reçue pour le compte camping');
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du compte camping:', error));
    }

    // Fonction pour mettre à jour les informations du compte camping
    function updateCompte(nomCamping, numeroSiret, email) {
        fetch('./PHP/API_GESTION_COMPTE/API_Update.php', {
            method: 'POST',
            body: JSON.stringify({ id_camping: id_camping, nomCamping: nomCamping, num_siret: numeroSiret, email: email }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.ok ? response.json() : Promise.reject('Réponse réseau non ok'))
        .then(data => {
            if (data.success) {
                console.log('Mise à jour du compte camping effectuée avec succès');
            } else {
                console.error('Erreur lors de la mise à jour du compte camping:', data.error);
            }
        })
        .catch(error => console.error('Erreur lors de la mise à jour du compte camping:', error));
    }

    // Fonction pour supprimer le compte camping
    function deleteCompte() {
        const csrfToken = getCSRFToken();
        const requestBody = JSON.stringify({ id_camping: id_camping, csrf_token: csrfToken });

        fetch('./PHP/API_GESTION_COMPTE/API_Delete.php', {
            method: 'POST',
            body: requestBody,
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.ok ? response.json() : Promise.reject('Réponse réseau non ok'))
        .then(data => console.log('Suppression du compte camping effectuée avec succès'))
        .catch(error => console.error('Erreur lors de la suppression du compte camping:', error));
    }

    // Événement de clic pour soumettre le formulaire de gestion du compte
    document.getElementById('Save_Update_Compte').addEventListener('click', function() {
        var nomCamping = document.getElementById('NomCampingCompte').value;
        var numeroSiret = document.getElementById('NumeroSiretCompte').value;
        var email = document.getElementById('EmailCompte').value;

        updateCompte(nomCamping, numeroSiret, email);

        document.getElementById('modal_Gestion_Compte').style.display = 'none';
    });

    // Événement de clic pour le bouton de suppression du compte camping
    document.getElementById('Delete_Compte').addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
            deleteCompte();
            document.getElementById('modal_Gestion_Compte').style.display = 'none';
        }
    });

    // Gestion de l'affichage de la fenêtre modale de gestion du compte
    document.getElementById('GestionCompte').addEventListener('click', function() {
        fetchCompteDetails();
        document.getElementById('modal_Gestion_Compte').style.display = 'block';
    });

    document.getElementById('Close_Modal_Gestion_Compte').addEventListener('click', function() {
        document.getElementById('modal_Gestion_Compte').style.display = 'none';
    });
});
