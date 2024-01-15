SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Structure de la table `CAMPING`
CREATE TABLE `CAMPING` (
  `ID_CAMPING` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_CAMPING` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NUM_SIRET` int(20) NOT NULL,
  `MAP` blob DEFAULT NULL,
  `PASSWORD` varchar(1000) NOT NULL,
  `TOKEN_CONFIRM` int(2) DEFAULT NULL,
  `TOP_USER_CONFIRMED` int(2) NOT NULL,
  `MDP_VACANCIER` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID_CAMPING`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Structure de la table `STRUCTURE`
CREATE TABLE `STRUCTURE` (
  `ID_STRUCTURE` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CAMPING` int(11) NOT NULL,
  `LIBELLE_STRUCTURE` varchar(50) NOT NULL,
  `NB_STRUCTURE` int(5) NOT NULL,
  `ETAT_STRUCTURE` enum('Disponible','Indisponible','Réparation','Préparation') DEFAULT NULL,
  PRIMARY KEY (`ID_STRUCTURE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Structure de la table `ACTIVITE`
CREATE TABLE `ACTIVITE` (
  `ID_ACTIVITE` int(11) NOT NULL AUTO_INCREMENT,
  `LIBELLE_ACT` varchar(50) NOT NULL,
  `ID_CAMPING` int(11) NOT NULL,
  PRIMARY KEY (`ID_ACTIVITE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Structure de la table `EVENEMENT`
CREATE TABLE `EVENEMENT` (
  `ID_EVENEMENT` int(11) NOT NULL AUTO_INCREMENT,
  `ID_STRUCTURE` int(11) NOT NULL,
  `DATE_HEURE_DEBUT` datetime NOT NULL,
  `DATE_HEURE_FIN` datetime NOT NULL,
  `LIB_ACTIVITE` varchar(50) NOT NULL,
  `ID_CAMPING` int(11) NULL,
  `ID_VACANCIER` int(11) NULL,
  PRIMARY KEY (`ID_EVENEMENT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Structure de la table `ROOM_EVENT`
CREATE TABLE `ROOM_EVENT` (
  `ID_ROOM_EVENT` int(11) NOT NULL AUTO_INCREMENT,
  `ID_EVENEMENT` int(11) NOT NULL,
  `ID_VACANCIER_PROPOSE` int(11) NOT NULL,
  `ID_VACANCIER_REJOIN` int(11) NULL,
  PRIMARY KEY (`ID_ROOM_EVENT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Structure de la table `VACANCIER`
CREATE TABLE `VACANCIER` (
  `ID_VACANCIER` int(11) NOT NULL AUTO_INCREMENT,
  `NOM` varchar(20) NOT NULL,
  `PRENOM` varchar(20) NOT NULL,
  `TEL` varchar(20) NOT NULL,
  `SEXE` varchar(10) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `DATE_DEB_VAC` date NOT NULL,
  `DATE_FIN_VAC` date NOT NULL,
  PRIMARY KEY (`ID_VACANCIER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Ajout des contraintes de clé étrangère
ALTER TABLE ACTIVITE
ADD CONSTRAINT fk_activite_camping
FOREIGN KEY (ID_CAMPING) REFERENCES CAMPING (ID_CAMPING);

ALTER TABLE EVENEMENT
ADD CONSTRAINT fk_evenement_structure
FOREIGN KEY (ID_STRUCTURE) REFERENCES STRUCTURE (ID_STRUCTURE),
ADD CONSTRAINT fk_evenement_camping
FOREIGN KEY (ID_CAMPING) REFERENCES CAMPING (ID_CAMPING);

ALTER TABLE ROOM_EVENT
ADD CONSTRAINT fk_room_event_evenement
FOREIGN KEY (ID_EVENEMENT) REFERENCES EVENEMENT (ID_EVENEMENT);

COMMIT;
