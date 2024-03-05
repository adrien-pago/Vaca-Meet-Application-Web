// Afficher la fenêtre modale pour la gestion du compte
// ajouter token CRSF
document.getElementById('GestionCompte').addEventListener('click', function() {
    document.getElementById('modal_Gestion_Compte').style.display = 'block';
});

// Fermer la fenêtre modale pour la gestion du compte
document.getElementById('Close_Modal_Gestion_Compte').addEventListener('click', function() {
    document.getElementById('modal_Gestion_Compte').style.display = 'none';
});

// Fonction pour mettre à jour les informations du compte camping
function updateCompte(id, nomCamping, numeroSiret, email) {
    fetch('./PHP/GESTION_COMPTE/API_Update.php', {
        method: 'POST',
        body: JSON.stringify({ id_camping: id, nomCamping: nomCamping, numeroSiret: numeroSiret, email: email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Traiter la réponse du serveur si nécessaire
        console.log('Mise à jour du compte camping effectuée avec succès');
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour du compte camping:', error);
    });
}

// Fonction pour supprimer le compte camping
function deleteCompte(id) {
    fetch('./PHP/GESTION_COMPTE/API_Delete.php', {
        method: 'POST',
        body: JSON.stringify({ id_camping: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Traiter la réponse du serveur si nécessaire
        console.log('Suppression du compte camping effectuée avec succès');
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du compte camping:', error);
    });
}

// Événement de clic pour soumettre le formulaire de gestion du compte
document.getElementById('Save_Update_Compte').addEventListener('click', function() {
    var idCamping = document.getElementById('IdCampingCompte').value;
    var nomCamping = document.getElementById('NomCampingCompte').value;
    var numeroSiret = document.getElementById('NumeroSiretCompte').value;
    var email = document.getElementById('EmailCompte').value;

    // Mettre à jour les informations du compte camping
    updateCompte(idCamping, nomCamping, numeroSiret, email);

    // Fermer la fenêtre modale après la soumission du formulaire
    document.getElementById('modal_Gestion_Compte').style.display = 'none';
});

// Événement de clic pour le bouton de suppression du compte camping
document.getElementById('Delete_Compte').addEventListener('click', function() {
    var idCamping = document.getElementById('IdCampingCompte').value;

    // Demander une confirmation avant la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
        // Supprimer le compte camping
        deleteCompte(idCamping);

        // Fermer la fenêtre modale après la suppression du compte
        document.getElementById('modal_Gestion_Compte').style.display = 'none';
    }
});
