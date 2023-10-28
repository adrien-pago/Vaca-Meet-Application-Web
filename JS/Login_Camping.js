document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});

function login() {
  // Récupérer les valeurs entrées par l'utilisateur
  let CampingName = document.getElementById("CampingName").value;
  let PasswordCamping = document.getElementById("PasswordCamping").value;
 
  // Vérifier si les champs sont vides
  if (CampingName.trim() == "" || PasswordCamping.trim() == "") {
      alert("Veuillez remplir tous les champs.");
      return false;
<<<<<<< HEAD
=======
    }
  
    // Envoyer une requête AJAX pour vérifier les informations de connexion
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/PHP/Verif_login_Camping.php', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        
        var response = JSON.parse(xhr.responseText);
        if (response.status === 'success') {
          // Si l'authentification est réussie, rediriger vers une autre page
          window.location.href = "Gestion_Camping.html";
        } else {
          // Sinon, afficher un message d'erreur
          alert(response.message);
        }
      } else if (xhr.status === 500) {
        alert('Une erreur s\'est produite du côté du serveur.');
      } else {
        alert('Une erreur s\'est produite lors de la vérification des informations de connexion.');
      }
    };
    var formData = new FormData();
	formData.append('CampingName', CampingName);
	formData.append('PasswordCamping', PasswordCamping);
    xhr.send(formData);
  
    // Empêcher le formulaire d'être soumis
    return false;
>>>>>>> f051e1761a7f25637fcc9dbeb025f303695b222a
  }

  // Envoyer une requête AJAX pour vérifier les informations de connexion
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/PHP/Verif_login_Camping.php', true);
  xhr.onload = function () {
      if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.status === 'success' && response.id) {
              // Créer un formulaire
              var form = document.createElement('form');
              form.method = 'POST';
              form.action = 'Gestion_Camping.html';

              // Ajouter l'ID du camping comme champ caché
              var hiddenField = document.createElement('input');
              hiddenField.type = 'hidden';
              hiddenField.name = 'id';
              hiddenField.value = response.id;
              form.appendChild(hiddenField);

              // Ajouter le formulaire au corps de la page et le soumettre
              document.body.appendChild(form);
              form.submit();
          } else {
              // Sinon, afficher un message d'erreur
              alert(response.message);
          }
      } else if (xhr.status === 500) {
          alert('Une erreur s\'est produite du côté du serveur.');
      } else {
          alert('Une erreur s\'est produite lors de la vérification des informations de connexion.');
      }
  };
  var formData = new FormData();
  formData.append('CampingName', CampingName);
  formData.append('PasswordCamping', PasswordCamping);
  xhr.send(formData);

  // Empêcher le formulaire d'être soumis
  return false;
}
