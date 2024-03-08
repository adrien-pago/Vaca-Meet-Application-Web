function register_compte(event) {
  // Pour annuler la soumission par défaut du formulaire :
  event.preventDefault();

  // Récupération des informations utilisateur
  let email = document.getElementById("email").value;
  let NomCamping = document.getElementById("NomCamping").value;
  let NumeroSiret = document.getElementById("NumSiretC").value;
  let password = document.getElementById("password").value;
  let passwordconfirm = document.getElementById("passwordConfirm").value;

  // Création d'un objet FormData pour stocker les données du formulaire
  let formData = new FormData();
  formData.append("email", email);
  formData.append("NomCamping", NomCamping);
  formData.append("NumSiretC", NumeroSiret);
  formData.append("password", password);
  formData.append("passwordConfirm", password);

  // Vérification si les mots de passe correspondent
  if (password !== passwordconfirm) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  // Vérification de la force du mot de passe
  function checkPasswordStrength(password) {
    // Initialize variables
    var strength = 0;
    var tips = "Le mot de passe doit :";

    // Check password length
    if (password.length < 8) {
      tips += "Etre plus grand que 8 caractères , ";
    } else {
      strength += 1;
    }

    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
      strength += 1;
    } else {
      tips += "Contenir au moins une Majuscule et une minuscule, ";
    }

    // Check for numbers
    if (password.match(/\d/)) {
      strength += 1;
    } else {
      tips += "Inclure au moins un chiffre, ";
    }

    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) {
      strength += 1;
    } else {
      tips += "Inclure au moins un caractère spécial, ";
    }

    // Return results
    if (strength < 3) {
      alert("Mot de passe incorrect. " + tips);
      return false;
    } else {
      return true;
    }
  }

  if (!checkPasswordStrength(password)) {
    // Remettre le focus sur le premier champ
    document.getElementById("email").focus();
    return;
  }

  // Requête AJAX
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/PHP/Verif_AddCompte_Camping.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        // Nettoyer la réponse JSON en supprimant les informations non JSON
        let jsonResponse = xhr.responseText.match(/\{.*\}/)[0];
        let response = JSON.parse(jsonResponse);
        if (response.status === "success") {
          alert(response.message);
          // Fermer le formulaire d'inscription et réinitialiser les champs
          document.getElementById("modal").style.display = "none";
          document.getElementById("email").value = "";
          document.getElementById("NomCamping").value = "";
          document.getElementById("NumSiretC").value = "";
          document.getElementById("password").value = "";
          document.getElementById("passwordConfirm").value = "";
        } else {
          alert(response.message);
        }
      } catch (e) {
        console.error("Erreur lors de l'analyse JSON:", e);
        console.error("Réponse du serveur:", xhr.responseText);
      }
    } else {
      alert("Une erreur s'est produite lors de la création du compte. Veuillez réessayer.");
    }
  };

  xhr.onerror = function () {
    alert("Une erreur réseau s'est produite lors de la création du compte.");
  };

  xhr.send(formData);
}
