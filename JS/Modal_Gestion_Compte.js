// Fonction pour récupérer les détails du compte camping
function fetchCompteDetails(idCamping) {
    var formData = new FormData();
    formData.append('id_camping', idCamping);

    fetch('./PHP/API_GESTION_COMPTE/API_Fetch.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
            document.getElementById('NumeroSiretCompte').value = data[0].NUM_SIRET ? data[0].NUM_SIRET : '';
            document.getElementById('EmailCompte').value = data[0].EMAIL ? data[0].EMAIL : '';
        } else {
            console.error('Aucune donnée reçue pour le compte camping');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des détails du compte camping:', error);
    });
}

// Fonction pour mettre à jour les informations du compte camping
function updateCompte(id, nomCamping, numeroSiret, email) {
    fetch('./PHP/GESTION_COMPTE/API_Update.php', {
        method: 'POST',
        body: JSON.stringify({ id_camping: id, nom: nomCamping, num_siret: numeroSiret, email: email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Mise à jour du compte camping effectuée avec succès');
        } else {
            console.error('Erreur lors de la mise à jour du compte camping:', data.error);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour du compte camping:', error);
    });
}

// Fonction pour supprimer le compte camping
function deleteCompte(id) {
    const csrfToken = getCSRFToken();

    const requestBody = JSON.stringify({
        id_camping: id,
        csrf_token: csrfToken
    });

    fetch('./PHP/GESTION_COMPTE/API_Delete.php', {
        method: 'POST',
        body: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Suppression du compte camping effectuée avec succès');
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du compte camping:', error);
    });
}

// Événement de clic pour soumettre le formulaire de gestion du compte
document.getElementById('Save_Update_Compte').addEventListener('click', function() {
    var idCamping = document.getElementById('campingForm').elements['id'].value;
    var nomCamping = document.getElementById('campingForm').elements['camping_name'].value;
    var numeroSiret = document.getElementById('NumeroSiretCompte').value;
    var email = document.getElementById('EmailCompte').value;

    updateCompte(idCamping, nomCamping, numeroSiret, email);

    document.getElementById('modal_Gestion_Compte').style.display = 'none';
});

// Événement de clic pour le bouton de suppression du compte camping
document.getElementById('Delete_Compte').addEventListener('click', function() {
    var idCamping = document.getElementById('campingForm').elements['id'].value;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
        deleteCompte(idCamping);
        document.getElementById('modal_Gestion_Compte').style.display = 'none';
    }
});

// Fonction pour récupérer le token CSRF depuis le cookie
function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token'))
        .split('=')[1];
    return cookieValue;
}

// Gestion de l'affichage de la fenêtre modale de gestion du compte
document.getElementById('GestionCompte').addEventListener('click', function() {
    var idCamping = document.getElementById('campingForm').elements['id'].value;
    var nomCamping = document.getElementById('campingForm').elements['camping_name'].value;

    document.getElementById('NomCampingCompte').value = nomCamping;
    fetchCompteDetails(idCamping);
    document.getElementById('modal_Gestion_Compte').style.display = 'block';

    document.getElementById('Close_Modal_Gestion_Compte').addEventListener('click', function() {
        document.getElementById('modal_Gestion_Compte').style.display = 'none';
    });
});
