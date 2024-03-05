
// Afficher la fenêtre modale pour la gestion du compte
document.getElementById('GestionCompte').addEventListener('click', function() {
    document.getElementById('modal_Gestion_Compte').style.display = 'block';
});

// Fermer la fenêtre modale pour la gestion du compte
document.getElementById('Close_Modal_Gestion_Compte').addEventListener('click', function() {
    document.getElementById('modal_Gestion_Compte').style.display = 'none';
});

// Soumettre le formulaire de gestion du compte
document.getElementById('Save_Update_Compte').addEventListener('click', function() {
    var nomCamping = document.getElementById('NomCampingCompte').value;
    var password = document.getElementById('PasswordCompte').value;
    var numeroSiret = document.getElementById('NumeroSiretCompte').value;
    var email = document.getElementById('EmailCompte').value;

    // Envoyer les données au serveur  
    fetch('update_account.php', {
        method: 'POST',
        body: JSON.stringify({ nomCamping: nomCamping, password: password, numeroSiret: numeroSiret, email: email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Traiter la réponse du serveur si nécessaire
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Fermer la fenêtre modale après la soumission du formulaire
    document.getElementById('modal_Gestion_Compte').style.display = 'none';
});
