# Application_Camping


**Contexte**   
Les campings sont souvent des lieux où les vacanciers cherchent à se détendre et à s'amuser. Cependant, bon nombre d'entre eux se retrouvent souvent isolés et n’osent pas proposer d’activités aux autres vacanciers afin de faire aussi des rencontres. Ou parfois même ils ne connaissent pas les diverses activités proposées au sein du camping. L'objectif de cette application est de dynamiser les activités du camping et de faciliter les rencontres entre vacanciers, en permettant aux vacanciers de proposer eux même des activités et d'inviter d'autres vacanciers à y participer. En plus des activités déjà mises en place par l’équipe d’animation du camping.  

**I) Cahier des Charges de l’application client pour les campings**

**I) 1. Objectifs Principaux** 
Permettre au camping de gérer sa liste d’activité 
Permettre au camping de gérer sa liste de structure
Permettre au camping de gérer son planning d’animation pour son équipe d’animation
Faciliter la gestion des activités proposé par le camping pour les vacanciers  

**I) 2. Fonctionnalités**

**I) 2.1 Écran de connexion à l’application client pour les campings**
Une page simple avec pour identification nom de camping et mot de passe.
Un bouton connexion pour accéder à l’application.
Un bouton création de compte pour permettre au camping de se créer un compte.
Popup de création de compte :
Un formulaire de création avec nom de camping, mot de passe, adresse email, N° de siret.
Une vérification avec un jeton token envoyer par email pour confirmer l’inscription.
Une vérification du N° de siret pour authentifier le camping

**I) 2.2 Écran de paramétrage pour ajouter les activités disponibles dans le camping**
Identification admin par camping
Permettre de gérer la liste des activités avec une table (Ajout / modification / suppression)
Permettre de gérer la liste des structures avec une table (Ajout / modification / suppression
Permettre de gérer le planning des animations proposé par le camping
Renseigner les activités autorisées dans la liste des activités, qui pourront être proposées par les vacanciers.

**I) 3. Interface**
Design moderne et responsive adapté aux différents formats d’écran d’ordinateurs.
Charte graphique à respecter

**I) 4. Sécurité** 
Stockage sécurisé des données des camping
Protection contre les failles de sécurité courantes :
	protection contre les injections SQL
	protection contre les injections XXS
	protection contre les attaques CSRF

**I) 5. Maintenance et Mises à jour** 
Intégrer les mises à jour directement sur le serveur qui héberge l’application.
Support pour les campings en cas de problèmes (plateforme de Ticketing pour gérer les incidents au cas par cas)

**II) Cahier des Charges de l’application mobile pour les vacanciers**

**II) 1. Objectifs Principaux** 

**II) 1. Objectifs Principaux**
Permettre aux vacanciers de consulter le planning d'animation du camping ou bien le planning proposé par les vacanciers.
Permettre à un vacancier de proposer une activité pour les autres vacanciers sur le planning vacancier
Permettre aux vacanciers de rejoindre une activité proposée par un vacancier sur le planning vacancier.
Dynamiser les activités au sein du camping
Faciliter l’échange et les rencontres entre les vacanciers  

**II) 2. Fonctionnalités**

**II) 2.1 Inscription / Connexion des vacanciers**
Inscription des vacanciers avec des informations de base (nom, prénom, email, mot de passe).
Connexion sécurisée.
stocker seulement le hash du mot de passe.  

**II) 2.2 Switch planning animation camping et planning vacancier**
Permettre aux vacanciers de visualiser le planning animation camping
Permettre aux vacanciers de visualiser le planning vacancier

**II) 2.3 Création de Salons sur le planning vacancier**
II) 2. Fonctionnalités

II) 2.1 Inscription / Connexion des vacanciers
Inscription des vacanciers avec des informations de base (nom, prénom, email, mot de passe).
Connexion sécurisée.
stocker seulement le hash du mot de passe.
II) 2.2 Switch planning animation camping et planning vacancier
Permettre aux vacancier de visualiser le planning animation camping
Permettre aux vacancier de visualiser le planning vacancier

II) 2.3 Création de Salons sur le planning vacancier
Un vacancier peut créer un salon pour une activité spécifique sur le planning vacancier.
Possibilité d'ajouter une description, une date, une heure et un lieu pour l'activité.
Option d'ajouter une photo ou une image représentative de l'activité.
Option de limiter le nombre de participants pour l'activité.
<<<<<<< HEAD
Des créneaux seront réservés sur planning d’animation vacancier.  

**II) 2.4 Rejoindre un Salon sur le planning vacancier**
Les vacanciers peuvent voir les activités proposées par les autres vacanciers sur le planning vacancier
Possibilité de rejoindre une activité (si le nombre maximum de participants n'est pas atteint).
Possibilité de quitter une activité si le vacancier change d'avis.
Une fois le salon complet ils disparaît à l’affichage et redevient actif si un vacancier le quitte   

**II) 2.5 Notifications**
Notifications en temps réel pour les vacanciers lorsqu'une nouvelle activité est proposée. (En option)
Notification pour le créateur de l'activité lorsque quelqu'un rejoint ou quitte son salon.
Notification une fois que le salon de l’activité est complet
Notification de rappel pour les vacancier inscrit à un salon d’activité 1h avant le début de l’activité  

**II) 2.6 Profil Utilisateur**
Les vacanciers peuvent voir et éditer leur profil.
Affichage des activités auxquelles le vacancier est inscrit (+ Historique des activité auxquelles le vacancier a participé)  

**II) 2.6 Système de Feedback**
Les vacanciers peuvent laisser des commentaires sur l'activité une fois qu'elle est terminée.
Possibilité de noter l'activité et le créateur du salon.  

**II) 3. Interface**
Design moderne et responsive adapté aux différents formats d’écran de téléphone.
Charte graphique à respecter

**II) 4. Sécurité**
Stockage sécurisé des données des vacancier
Protection contre les failles de sécurité courantes :
	protection contre les injections SQL
	protection contre les injections XXS
	protection contre les attaques CSRF

**I) 5. Maintenance et Mises à jour**
Intégrer les mises à jour directement sur le serveur qui héberge l’application.
Support pour les vacanciers en cas de problèmes (plateforme de Ticketing pour gérer les incidents au cas par cas)

=======
Des créneaux seront réservés sur planning d’animation vacancier.
II) 2.4 Rejoindre un Salon sur le planning vacancier
Les vacanciers peuvent voir les activités proposées par les autres vacanciers sur le planning vacancier
Possibilité de rejoindre une activité (si le nombre maximum de participants n'est pas atteint).
Possibilité de quitter une activité si le vacancier change d'avis.
Une fois le salon complet ils  disparaît à l’affichage et redevient actif si un vacancier le quitte 
II) 2.5 Notifications
Notifications en temps réel pour les vacanciers lorsqu'une nouvelle activité est proposée. (En option)
Notification pour le créateur de l'activité lorsque quelqu'un rejoint ou quitte son salon.
Notification une fois que le salon de l’activité est complet
Notification de rappel pour les vacancier inscrit à un salon d’activité  1h avant le début de l’activité
II) 2.6 Profil Utilisateur
Les vacanciers peuvent voir et éditer leur profil.
Affichage des activités auxquelles le vacancier est inscrit (+ Historique des activité auxquelles le vacancier a participé)
II) 2.6 Système de Feedback
Les vacanciers peuvent laisser des commentaires sur l'activité une fois qu'elle est terminée.
Possibilité de noter l'activité et le créateur du salon.
II) 3. Interface
Design moderne et responsive adapté aux différents formats d’écran de téléphone.
Charte graphique  à respecter

II) 4. Sécurité 
Stockage sécurisé des données des vacancier
Protection contre les failles de sécurité courantes:
	protection contre les injection SQL
	protection contre les injection XXS
	protection contre les attaque CSRF

II) 5. Maintenance et Mises à jour 
Intégrer les mises à jour directement sur le serveur qui héberge l’application.
Support pour les vacancier en cas de problèmes (plateforme de Ticketing pour gérer les incident au cas par cas)


Informations supplémentaires nécessaires 
- Un nom pour l'application ?
- Choisir un modèle de base de données
- Choisir la techno support pour l’application mobile et la techno pour l’application client camping
- Intégrer des fonctionnalités premium payantes ?
- Un budget précis pour le développement de l'application ?
>>>>>>> 023ebc811e37992b0f8b1577bc0105386e696e15


