

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
  `ID_STRUCTURE` int(11) NOT NULL,
  `LIBELLE_ACT` varchar(50) NOT NULL,
  `ID_VAC_ACT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `CAMPING`
--

CREATE TABLE `CAMPING` (
  `ID_CAMPING` int(11) NOT NULL,
  `NOM_CAMPING` varchar(50) NOT NULL,
  `NUM_SIRET` int(20) NOT NULL,
  `MAP` blob DEFAULT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `TOKEN_CONFIRM` int(50) DEFAULT NULL,
  `ID_STRUCTURE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `STRUCTURE`
--

CREATE TABLE `STRUCTURE` (
  `ID_STRUCTURE` int(11) NOT NULL,
  `ID_CAMPING` int(11) NOT NULL,
  `LIBELLE_STRUC` varchar(50) NOT NULL,
  `NB_STRUC` int(5) NOT NULL,
  `ID_ACTIVITE` int(11) NOT NULL,
  `ETAT_STRUC` enum('Disponible','Indisponible','Réparation','Préparation') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ACTIVITE`
--
ALTER TABLE `ACTIVITE`
  ADD PRIMARY KEY (`ID_ACTIVITE`);

--
-- Index pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  ADD PRIMARY KEY (`ID_CAMPING`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ACTIVITE`
--
ALTER TABLE `ACTIVITE`
  MODIFY `ID_ACTIVITE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  MODIFY `ID_CAMPING` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
