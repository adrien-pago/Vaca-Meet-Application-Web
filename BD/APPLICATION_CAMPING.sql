-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 16 avr. 2024 à 12:42
-- Version du serveur : 10.5.19-MariaDB-0+deb11u2
-- Version de PHP : 8.2.15

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
-- Déchargement des données de la table `ACTIVITE`
--

INSERT INTO `ACTIVITE` (`ID_ACTIVITE`, `LIBELLE_ACT`, `ID_CAMPING`) VALUES
(3, 'Tournoi de pétanque', 1),
(4, 'Water-polo ', 1),
(12, 'Golf', 1),
(13, 'poney', 1),
(14, 'pétanque', 1),
(15, 'Apéritif', 1),
(17, 'Divers', 1);

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
  `TOKEN_CONFIRM` varchar(250) NOT NULL,
  `TOP_USER_CONFIRMED` int(2) NOT NULL,
  `MDP_VACANCIER` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `CAMPING`
--

INSERT INTO `CAMPING` (`ID_CAMPING`, `NOM_CAMPING`, `EMAIL`, `NUM_SIRET`, `MAP`, `PASSWORD`, `TOKEN_CONFIRM`, `TOP_USER_CONFIRMED`, `MDP_VACANCIER`) VALUES
(1, 'camping-pago', 'adrien.pago@gmail.com', 1414141, NULL, '$2y$10$pmbRzjMVycPxIiPhgrr2peIuXKvWQx02ECrQT36TBvikFOAsaqpY6', '847751', 1, 'toto'),
(20, 'camping-ufa47', 'adrien.pago@campusermitage.com', 1213212, NULL, '$2y$10$mtRqGOJ1nwqDH7wOByh3a.kXZa6kAKVT9Pd3rkf2.3cARMvd4XR2.', '9b9f3064f322a75d0d8e0dffb9065305ab9ffb5458f5bd954d0e18b1486f72f7', 1, '');

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
-- Déchargement des données de la table `COMPTE_VACA_MEET`
--

INSERT INTO `COMPTE_VACA_MEET` (`ID_VACA`, `NOM`, `MDP`, `EMAIL`, `TOKEN_COMPTE`, `COMPTE_CONFIRME`, `PHOTO`) VALUES
(1, 'Adrien', '$2y$10$cGedhVEbkVYo58m3yxYRxOvmXj.eiJyUZY4wILVx3UhhiJ4VBgXUW', 'adrien.pago@gmail.com', 'a909c07b4e54a11a10bfac4d0e2391ed736fc73427fcfe87255c6030da6eb135', 1, ''),
(2, 'Pierre', '', '', '', 0, ''),
(3, 'Eric', '', '', '', 0, ''),
(4, 'Sabine', '', '', '', 0, ''),
(5, 'Elsa', '', '', '', 0, '');

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
(24, 6, '2024-02-02 14:21:00', '2024-02-02 16:24:00', 'poney', 1),
(25, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'pétanque', 1),
(26, 1, '2024-03-07 10:00:00', '2024-03-07 11:00:00', 'Apéritif', 1),
(27, 1, '2024-03-07 10:00:00', '2024-03-07 11:00:00', 'Golf', 1),
(28, 6, '2024-03-08 11:47:00', '2024-03-08 13:47:00', 'Water-polo ', 1);

-- --------------------------------------------------------

--
-- Structure de la table `ROOM_EVENT`
--

CREATE TABLE `ROOM_EVENT` (
  `ID_ROOM_EVENT` int(11) NOT NULL,
  `ID_CAMPING` int(11) NOT NULL,
  `ID_VACA_INIT` int(11) NOT NULL,
  `NB_VACA_JOIN` int(4) DEFAULT NULL,
  `DATE_EVENT_ROOM` date NOT NULL,
  `HEURE` time NOT NULL,
  `LIBELLE_EVENT_ROOM` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `ROOM_EVENT`
--

INSERT INTO `ROOM_EVENT` (`ID_ROOM_EVENT`, `ID_CAMPING`, `ID_VACA_INIT`, `NB_VACA_JOIN`, `DATE_EVENT_ROOM`, `HEURE`, `LIBELLE_EVENT_ROOM`) VALUES
(16, 1, 1, 1, '2024-01-15', '10:00:00', 'Surf à la plage'),
(17, 1, 1, 1, '2024-01-15', '14:00:00', 'Barbecu au centre du camping'),
(21, 1, 1, 1, '2024-01-15', '16:00:00', 'Pétanque sur la plage'),
(22, 1, 1, 0, '0000-00-00', '18:00:00', 'Volley plage'),
(23, 1, 1, 1, '2024-01-15', '18:00:00', 'Volley plage');

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
-- Déchargement des données de la table `STRUCTURE`
--

INSERT INTO `STRUCTURE` (`ID_STRUCTURE`, `ID_CAMPING`, `LIBELLE_STRUCTURE`, `NB_STRUCTURE`, `ETAT_STRUCTURE`) VALUES
(2, 1, 'Terrain de Volley', 2, NULL),
(3, 1, 'Terrain de pétanque', 2, NULL),
(6, 1, 'Piscine', 1, NULL),
(7, 1, 'Terrain de mini golf', 10, NULL),
(8, 1, 'Emplacement camping', 450, NULL),
(12, 1, 'Terrain de foot', 5, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `VOTE_STATE`
--

CREATE TABLE `VOTE_STATE` (
  `ID_VOTE` int(11) NOT NULL,
  `ID_VACA` int(11) DEFAULT NULL,
  `ID_ROOM_EVENT` int(11) DEFAULT NULL,
  `VOTE_STATE` enum('upvote','downvote') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `VOTE_STATE`
--

INSERT INTO `VOTE_STATE` (`ID_VOTE`, `ID_VACA`, `ID_ROOM_EVENT`, `VOTE_STATE`) VALUES
(43, 1, 16, 'upvote'),
(44, 1, 21, 'upvote'),
(45, 1, 17, 'upvote'),
(46, 1, 23, 'upvote');

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
  ADD PRIMARY KEY (`ID_ROOM_EVENT`);

--
-- Index pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  ADD PRIMARY KEY (`ID_STRUCTURE`);

--
-- Index pour la table `VOTE_STATE`
--
ALTER TABLE `VOTE_STATE`
  ADD PRIMARY KEY (`ID_VOTE`),
  ADD KEY `ID_VACA` (`ID_VACA`),
  ADD KEY `ID_ROOM_EVENT` (`ID_ROOM_EVENT`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ACTIVITE`
--
ALTER TABLE `ACTIVITE`
  MODIFY `ID_ACTIVITE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  MODIFY `ID_CAMPING` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `COMPTE_VACA_MEET`
--
ALTER TABLE `COMPTE_VACA_MEET`
  MODIFY `ID_VACA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `EVENEMENT`
--
ALTER TABLE `EVENEMENT`
  MODIFY `ID_EVENEMENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `ROOM_EVENT`
--
ALTER TABLE `ROOM_EVENT`
  MODIFY `ID_ROOM_EVENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  MODIFY `ID_STRUCTURE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `VOTE_STATE`
--
ALTER TABLE `VOTE_STATE`
  MODIFY `ID_VOTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
  ADD CONSTRAINT `fk_evenement_camping` FOREIGN KEY (`ID_CAMPING`) REFERENCES `CAMPING` (`ID_CAMPING`);

--
-- Contraintes pour la table `VOTE_STATE`
--
ALTER TABLE `VOTE_STATE`
  ADD CONSTRAINT `VOTE_STATE_ibfk_1` FOREIGN KEY (`ID_VACA`) REFERENCES `COMPTE_VACA_MEET` (`ID_VACA`),
  ADD CONSTRAINT `VOTE_STATE_ibfk_2` FOREIGN KEY (`ID_ROOM_EVENT`) REFERENCES `ROOM_EVENT` (`ID_ROOM_EVENT`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
