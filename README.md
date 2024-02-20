# Vaca Meet Application Web

**Contexte**   
Les campings sont souvent des lieux où les vacanciers cherchent à se détendre et à s'amuser. Cependant, bon nombre d'entre eux se retrouvent souvent isolés et n’osent pas proposer d’activités aux autres vacanciers afin de faire des rencontres et de partager des moments conviviaux. Ou parfois même ils n’ont pas connaissances des diverses activités proposées au sein du camping.

**1. Objectifs** 
Une application web qui va servir d’interface pour les gérant des campings. A partir de laquelle ils vont pouvoir gérer leurs structures, leurs activités et leurs planning d’animation. Ils vont aussi pouvoir gérer le mot de passe qu’ils vont ensuite donner aux vacanciers pour qu’ils aient accès aux plannings d’animation du camping et aux activités proposé par les vacancier depuis leur téléphone.
  
**2. Fonctionnalités**
<u>Connexion et création de compte</u> 
Une page simple avec pour identification nom de camping et mot de passe.
Un bouton connexion pour accéder à l’application.
Un bouton création de compte pour permettre au camping de se créer un compte à l’aide d’une fenêtre modal.

<u>fenêtre modal de création de compte:</u>
Un formulaire de création avec nom de camping, mot de passe, adresse email, N°  de Siret.
Une vérification avec un jeton Token envoyer par email pour confirmer l’inscription.
stocker seulement le hash du mot de passe en base de donnée.(Sécurité)

<u>Paramétrage pour la gestion des (Activités, Structure, Plannings animations)</u>
Identification par camping récupéré.
Gérer la listes des structures avec une table (Ajout / modification / suppression).
Gérer la listes des activités avec une table (Ajout / modification / suppression).
Permettre de gérer et d’afficher le planning semaine des animations proposé par le camping.

<u>Gérer le mot de passe pour les vacanciers</u>
Avec un bouton permettre la modification du mot de passe qui sera utilisé par les vacanciers pour l’application mobile.


