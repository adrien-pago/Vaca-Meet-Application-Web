document.addEventListener("DOMContentLoaded", function() {
    // Récupération de l'ID et du nom de camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    var nom_camping = document.getElementById('campingForm').elements['camping_name'].value;

      //////////////////// Gestion ouverture fenêtre modale mdp vacancier /////////////////////////////
      var mdpVacancierButton = document.getElementById('MDP_Vacancier');
      if (mdpVacancierButton) {
          mdpVacancierButton.addEventListener('click', function() {
              document.getElementById('modal_md_vacancier').style.display = 'block';
          });
      } else {
          console.error("L'élément 'MDP_Vacancier' est introuvable dans le DOM.");
      }
  
  //////////////////// Gestion ouverture fenêtre modale mdp vacancier /////////////////////////////
  var mdpVacancierButton = document.getElementById('MDP_Vacancier');
  if (mdpVacancierButton) {
      mdpVacancierButton.addEventListener('click', function() {
          document.getElementById('modal_md_vacancier').style.display = 'block';
      });
  } else {
      console.error("L'élément 'MDP_Vacancier' est introuvable dans le DOM.");
  }

  //////////////////// Gestion fermeture fenêtre modale mdp vacancier /////////////////////////////
  var closeButton = document.getElementById('Close_Modal_mdp_Vacancier');
  if (closeButton) {
      closeButton.addEventListener('click', closeModal);
  } else {
      console.error("L'élément 'Close_Modal_mdp_Vacancier' est introuvable dans le DOM.");
  }

  //////////////////// Gestion modification mdp vacancier /////////////////////////////
  var validateButton = document.getElementById('Save_New_Mdp_Vacancier');
  if (validateButton) {
      validateButton.addEventListener('click', updatePassword);
  } else {
      console.error("L'élément 'validatePasswordButton' est introuvable dans le DOM.");
  }

  function closeModal() {
      document.getElementById('modal_md_vacancier').style.display = 'none';
  }

  function updatePassword() {
      var newPassword = document.getElementById('newPassword').value;
      var confirmPassword = document.getElementById('confirmPassword').value;

      if (newPassword === confirmPassword) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/PHP/API_update_mdp_vacancier.php', true);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  alert("Mot de passe mis à jour avec succès.");
                  closeModal();
              }
          };
          xhr.send("campingId=" + encodeURIComponent(campingId) + "&newPassword=" + encodeURIComponent(newPassword));
      } else {
          alert("Les mots de passe ne correspondent pas.");
      }
  }
})