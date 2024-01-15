document.addEventListener("DOMContentLoaded", function() {
    // Récupération de l'ID et du nom de camping depuis le formulaire
    var id_camping = document.getElementById('campingForm').elements['id'].value; 
    var nom_camping = document.getElementById('campingForm').elements['camping_name'].value;
    
    ///////////// Gestion Element Actif //////////////////////////////
    var gestionStructureBtn = document.getElementById('gestionStructure');
    var gestionAnimationBtn = document.getElementById('gestionAnimation');
    var gestionPlanningBtn = document.getElementById('gestionPlanning');
    var tableau = document.getElementById('tableau'); 
    var tableauAnimation = document.getElementById('tableauAnimation'); // Nouveau
    var planning = document.getElementById('planning'); 

    if (gestionStructureBtn && gestionAnimationBtn && gestionPlanningBtn && tableau && tableauAnimation && planning) {
        gestionStructureBtn.addEventListener('click', function() {
            tableau.style.display = 'block';
            tableauAnimation.style.display = 'none'; // Nouveau
            planning.style.display = 'none';
            this.classList.add('active');
            gestionAnimationBtn.classList.remove('active'); // Nouveau
            gestionPlanningBtn.classList.remove('active');
        });

        gestionAnimationBtn.addEventListener('click', function() { // Nouveau
            tableau.style.display = 'none';
            tableauAnimation.style.display = 'block'; // Nouveau
            planning.style.display = 'none';
            this.classList.add('active');
            gestionStructureBtn.classList.remove('active');
            gestionPlanningBtn.classList.remove('active');
        });

        gestionPlanningBtn.addEventListener('click', function() {
            tableau.style.display = 'none';
            tableauAnimation.style.display = 'none'; // Nouveau
            planning.style.display = 'block';
            this.classList.add('active');
            gestionStructureBtn.classList.remove('active');
            gestionAnimationBtn.classList.remove('active'); // Nouveau
        });
    } else {
        console.error('Un ou plusieurs éléments requis sont introuvables dans le DOM');
    }
})