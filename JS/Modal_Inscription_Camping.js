function ouvre_modal() {
    //Ouverture de la fenetre modal
    var modal = document.getElementById("modal");
    modal.style.display = "block"
    // Ferme la fenetre modal lorsque l'utilisateur clique sur la croix en haut à droite
    modal.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";
    });
  }