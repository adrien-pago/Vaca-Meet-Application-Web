
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `APPLICATION_CAMPING`
--

-- --------------------------------------------------------

--
-- Structure de la table `ACTIVITE`
--

CREATE TABLE `ACTIVITE` (
  `ID_ACTIVITE` int(11) NOT NULL,
  `LIBELLE_ACT` varchar(50) NOT NULL,
  `ID_CAMPING` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- RELATIONS POUR LA TABLE `ACTIVITE`:
--   `ID_CAMPING`
--       `CAMPING` -> `ID_CAMPING`
--

--
-- Déchargement des données de la table `ACTIVITE`
--

INSERT INTO `ACTIVITE` (`ID_ACTIVITE`, `LIBELLE_ACT`, `ID_CAMPING`) VALUES
(1, 'Tournoi de foot', 1),
(3, 'Tournoi de pétanque', 1),
(4, 'Water-polo', 1),
(12, 'Golf', 1),
(13, 'poney', 1),
(14, 'pétanque', 1),
(15, 'Apéritif', 1),
(16, 'Divers', 1);

-- --------------------------------------------------------

--
-- Structure de la table `CAMPING`
--

CREATE TABLE `CAMPING` (
  `ID_CAMPING` int(11) NOT NULL,
  `NOM_CAMPING` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NUM_SIRET` int(20) NOT NULL,
  `MAP` blob DEFAULT NULL,
  `PASSWORD` varchar(1000) NOT NULL,
  `TOKEN_CONFIRM` int(2) DEFAULT NULL,
  `TOP_USER_CONFIRMED` int(2) NOT NULL,
  `MDP_VACANCIER` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- RELATIONS POUR LA TABLE `CAMPING`:
--

--
-- Déchargement des données de la table `CAMPING`
--

INSERT INTO `CAMPING` (`ID_CAMPING`, `NOM_CAMPING`, `EMAIL`, `NUM_SIRET`, `MAP`, `PASSWORD`, `TOKEN_CONFIRM`, `TOP_USER_CONFIRMED`, `MDP_VACANCIER`) VALUES
(1, 'camping-pago', 'adrien.pago@gmail.com', 1414141, NULL, '$2y$10$pmbRzjMVycPxIiPhgrr2peIuXKvWQx02ECrQT36TBvikFOAsaqpY6', 847751, 1, 'test'),
(2, 'camping-fraise', 'adrien.pago@ufa47.org', 1526, NULL, '$2y$10$ost57xyHMnlnCoCnstue9OjiHRq6iY.wfbZuoeEbGSFp54hUx1/cq', 0, 1, '');

-- --------------------------------------------------------

--
-- Structure de la table `COMPTE_VACA_MEET`
--

CREATE TABLE `COMPTE_VACA_MEET` (
  `ID_VACA` int(11) NOT NULL,
  `NOM` varchar(50) NOT NULL,
  `MDP` varchar(10000) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `TOKEN_COMPTE` varchar(10000) NOT NULL,
  `COMPTE_CONFIRME` int(11) NOT NULL,
  `PHOTO` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- RELATIONS POUR LA TABLE `COMPTE_VACA_MEET`:
--

--
-- Déchargement des données de la table `COMPTE_VACA_MEET`
--

INSERT INTO `COMPTE_VACA_MEET` (`ID_VACA`, `NOM`, `MDP`, `EMAIL`, `TOKEN_COMPTE`, `COMPTE_CONFIRME`, `PHOTO`) VALUES
(1, 'Adrien', '$2y$10$cGedhVEbkVYo58m3yxYRxOvmXj.eiJyUZY4wILVx3UhhiJ4VBgXUW', 'adrien.pago@gmail.com', 'a909c07b4e54a11a10bfac4d0e2391ed736fc73427fcfe87255c6030da6eb135', 1, '');

-- --------------------------------------------------------

--
-- Structure de la table `EVENEMENT`
--

CREATE TABLE `EVENEMENT` (
  `ID_EVENEMENT` int(11) NOT NULL,
  `ID_STRUCTURE` int(11) NOT NULL,
  `DATE_HEURE_DEBUT` datetime NOT NULL,
  `DATE_HEURE_FIN` datetime NOT NULL,
  `LIB_ACTIVITE` varchar(50) NOT NULL,
  `ID_CAMPING` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- RELATIONS POUR LA TABLE `EVENEMENT`:
--   `ID_CAMPING`
--       `CAMPING` -> `ID_CAMPING`
--   `ID_STRUCTURE`
--       `STRUCTURE` -> `ID_STRUCTURE`
--

--
-- Déchargement des données de la table `EVENEMENT`
--

INSERT INTO `EVENEMENT` (`ID_EVENEMENT`, `ID_STRUCTURE`, `DATE_HEURE_DEBUT`, `DATE_HEURE_FIN`, `LIB_ACTIVITE`, `ID_CAMPING`) VALUES
(3, 1, '2024-01-15 08:00:00', '2024-01-15 10:00:00', 'Tournoi de foot', 1),
(4, 3, '2024-01-17 16:18:00', '2024-01-16 17:18:00', 'Golf', 1),
(5, 3, '2024-01-15 11:00:00', '2024-01-15 12:02:00', 'Tournoi de pétanque', 1),
(6, 2, '2024-01-15 16:06:00', '2024-01-15 18:07:00', 'poney', 1),
(7, 7, '2024-01-16 16:06:00', '2024-01-16 18:07:00', 'Golf', 1),
(8, 3, '2024-01-16 10:06:00', '2024-01-16 13:07:00', 'pétanque', 1),
(9, 6, '2024-01-17 10:00:00', '2024-01-17 12:00:00', 'Water-polo', 1),
(10, 1, '2024-01-18 14:00:00', '2024-01-18 20:00:00', 'Tournoi de foot', 1),
(11, 7, '2024-01-18 08:00:00', '2024-01-18 10:00:00', 'Golf', 1),
(12, 2, '2024-01-19 08:00:00', '2024-01-19 12:00:00', 'poney', 1),
(13, 1, '2024-01-19 14:00:00', '2024-01-19 18:00:00', 'Golf', 1),
(14, 1, '2024-01-20 08:00:00', '2024-01-20 12:00:00', 'Water-polo', 1),
(15, 1, '2024-01-20 14:00:00', '2024-01-20 18:00:00', 'Tournoi de foot', 1),
(22, 7, '2024-02-02 08:08:00', '2024-02-02 10:09:00', 'Golf', 1),
(23, 7, '2024-01-21 08:08:00', '2024-01-21 10:09:00', 'Golf', 1),
(24, 6, '2024-02-02 14:21:00', '2024-02-02 16:24:00', 'poney', 1);

-- --------------------------------------------------------

--
-- Structure de la table `ROOM_EVENT`
--

CREATE TABLE `ROOM_EVENT` (
  `ID_ROOM_EVENT` int(11) NOT NULL,
  `ID_CAMPING` int(11) NOT NULL,
  `ID_EVENEMENT` int(11) NOT NULL,
  `ID_VACA_INIT` int(11) NOT NULL,
  `ID_VACA_JOIN` int(11) DEFAULT NULL,
  `HEURE_DEBUT` date NOT NULL,
  `HEURE_FIN` date NOT NULL,
  `NB_PLACE` int(11) NOT NULL,
  `TOP_ROOM` int(11) NOT NULL COMMENT 'A = Annulé / E= en attente de vacancier / C = Complet / V = Activité en cours / T = Activité terminé'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- RELATIONS POUR LA TABLE `ROOM_EVENT`:
--   `ID_EVENEMENT`
--       `EVENEMENT` -> `ID_EVENEMENT`
--

-- --------------------------------------------------------

--
-- Structure de la table `STRUCTURE`
--

CREATE TABLE `STRUCTURE` (
  `ID_STRUCTURE` int(11) NOT NULL,
  `ID_CAMPING` int(11) NOT NULL,
  `LIBELLE_STRUCTURE` varchar(50) NOT NULL,
  `NB_STRUCTURE` int(5) NOT NULL,
  `ETAT_STRUCTURE` enum('Disponible','Indisponible','Réparation','Préparation') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- RELATIONS POUR LA TABLE `STRUCTURE`:
--

--
-- Déchargement des données de la table `STRUCTURE`
--

INSERT INTO `STRUCTURE` (`ID_STRUCTURE`, `ID_CAMPING`, `LIBELLE_STRUCTURE`, `NB_STRUCTURE`, `ETAT_STRUCTURE`) VALUES
(1, 1, 'Terrain de Foot', 6, NULL),
(2, 1, 'Terrain de Volley', 2, NULL),
(3, 1, 'Terrain de pétanque', 2, NULL),
(6, 1, 'Piscine', 1, NULL),
(7, 1, 'Terrain de mini golf', 10, NULL),
(8, 1, 'Emplacement camping', 450, NULL),
(9, 1, 'Non défini', 10, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ACTIVITE`
--
ALTER TABLE `ACTIVITE`
  ADD PRIMARY KEY (`ID_ACTIVITE`),
  ADD KEY `fk_activite_camping` (`ID_CAMPING`);

--
-- Index pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  ADD PRIMARY KEY (`ID_CAMPING`);

--
-- Index pour la table `COMPTE_VACA_MEET`
--
ALTER TABLE `COMPTE_VACA_MEET`
  ADD PRIMARY KEY (`ID_VACA`);

--
-- Index pour la table `EVENEMENT`
--
ALTER TABLE `EVENEMENT`
  ADD PRIMARY KEY (`ID_EVENEMENT`),
  ADD KEY `fk_evenement_structure` (`ID_STRUCTURE`),
  ADD KEY `fk_evenement_camping` (`ID_CAMPING`);

--
-- Index pour la table `ROOM_EVENT`
--
ALTER TABLE `ROOM_EVENT`
  ADD PRIMARY KEY (`ID_ROOM_EVENT`),
  ADD KEY `fk_room_event_evenement` (`ID_EVENEMENT`);

--
-- Index pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  ADD PRIMARY KEY (`ID_STRUCTURE`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ACTIVITE`
--
ALTER TABLE `ACTIVITE`
  MODIFY `ID_ACTIVITE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  MODIFY `ID_CAMPING` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `COMPTE_VACA_MEET`
--
ALTER TABLE `COMPTE_VACA_MEET`
  MODIFY `ID_VACA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `EVENEMENT`
--
ALTER TABLE `EVENEMENT`
  MODIFY `ID_EVENEMENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `ROOM_EVENT`
--
ALTER TABLE `ROOM_EVENT`
  MODIFY `ID_ROOM_EVENT` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  MODIFY `ID_STRUCTURE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ACTIVITE`
--
ALTER TABLE `ACTIVITE`
  ADD CONSTRAINT `fk_activite_camping` FOREIGN KEY (`ID_CAMPING`) REFERENCES `CAMPING` (`ID_CAMPING`);

--
-- Contraintes pour la table `EVENEMENT`
--
ALTER TABLE `EVENEMENT`
  ADD CONSTRAINT `fk_evenement_camping` FOREIGN KEY (`ID_CAMPING`) REFERENCES `CAMPING` (`ID_CAMPING`),
  ADD CONSTRAINT `fk_evenement_structure` FOREIGN KEY (`ID_STRUCTURE`) REFERENCES `STRUCTURE` (`ID_STRUCTURE`);

--
-- Contraintes pour la table `ROOM_EVENT`
--
ALTER TABLE `ROOM_EVENT`
  ADD CONSTRAINT `fk_room_event_evenement` FOREIGN KEY (`ID_EVENEMENT`) REFERENCES `EVENEMENT` (`ID_EVENEMENT`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
