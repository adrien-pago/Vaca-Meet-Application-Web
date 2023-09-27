function register_compte(event) {
    // Pour annuler la soumission par défaut du formulaire :
    event.preventDefault();
  
    // Récupération des information utilisateurs
    let email = document.getElementById("email").value;
    let NomCamping = document.getElementById("NomCamping").value;
    let NumeroSiret = document.getElementById("NumSiretC").value;
    let password = document.getElementById("password").value;
    
    // Création d'un objet FormData pour stocker les données du formulaire
    let formData = new FormData();
    formData.append("email", email);
    formData.append("NomCamping", NomCamping);
    formData.append("NumSiretC", NumeroSiret);
    formData.append("password", password);
    
    // Requête AJAX
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/PHP/Verif_AddCompte_Camping.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          console.log(xhr.responseText);
          let response = JSON.parse(xhr.responseText);
          console.log(response); // Ajout de cette ligne pour afficher la réponse dans la console du navigateur
    
          if (response.status === "success") {
            alert(response.message);
            // Fermer le formulaire d'inscription et réinitialiser les champs
            document.getElementById("modal").style.display = "none";
            document.getElementById("email").value = "";
            document.getElementById("NomCamping").value = "";
            document.getElementById("password").value = "";
            window.location.href = "/Inscription_Camping.html";
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
  