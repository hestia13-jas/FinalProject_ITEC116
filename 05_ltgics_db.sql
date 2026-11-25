-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2026 at 07:52 AM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `05_ltgics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `TourDate` datetime NOT NULL,
  `Status` varchar(255) NOT NULL,
  `UserID` int(11) NOT NULL,
  `GuideID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guide_languages`
--

CREATE TABLE `guide_languages` (
  `id` int(11) NOT NULL,
  `GuideID` int(11) NOT NULL,
  `LanguageID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guide_languages`
--

INSERT INTO `guide_languages` (`id`, `GuideID`, `LanguageID`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2026-11-24 21:39:46', '2026-11-24 21:39:46');

-- --------------------------------------------------------

--
-- Table structure for table `guide_profiles`
--

CREATE TABLE `guide_profiles` (
  `id` int(11) NOT NULL,
  `Bio` text DEFAULT NULL,
  `LicenseNumber` varchar(255) NOT NULL,
  `Availability` varchar(255) NOT NULL,
  `UserID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guide_profiles`
--

INSERT INTO `guide_profiles` (`id`, `Bio`, `LicenseNumber`, `Availability`, `UserID`, `createdAt`, `updatedAt`) VALUES
(1, 'Sample Bio (Updated)', 'Sample LicenseNumber', 'Sample Availability', 1, '2026-11-24 21:36:48', '2026-11-24 21:37:05');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `LanguageName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `LanguageName`, `createdAt`, `updatedAt`) VALUES
(1, 'Sample LanguageName (Updated)', '2026-11-24 21:36:05', '2026-11-24 21:36:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(160) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Role` varchar(30) NOT NULL DEFAULT 'user',
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bookings_userid` (`UserID`),
  ADD KEY `fk_bookings_guideid` (`GuideID`);

--
-- Indexes for table `guide_languages`
--
ALTER TABLE `guide_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_guide_languages_guideid` (`GuideID`),
  ADD KEY `fk_guide_languages_languageid` (`LanguageID`);

--
-- Indexes for table `guide_profiles`
--
ALTER TABLE `guide_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_guide_profiles_userid` (`UserID`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `guide_languages`
--
ALTER TABLE `guide_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `guide_profiles`
--
ALTER TABLE `guide_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_guideid` FOREIGN KEY (`GuideID`) REFERENCES `guide_profiles` (`id`),
  ADD CONSTRAINT `fk_bookings_userid` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `guide_languages`
--
ALTER TABLE `guide_languages`
  ADD CONSTRAINT `fk_guide_languages_guideid` FOREIGN KEY (`GuideID`) REFERENCES `guide_profiles` (`id`),
  ADD CONSTRAINT `fk_guide_languages_languageid` FOREIGN KEY (`LanguageID`) REFERENCES `languages` (`id`);

--
-- Constraints for table `guide_profiles`
--
ALTER TABLE `guide_profiles`
  ADD CONSTRAINT `fk_guide_profiles_userid` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
