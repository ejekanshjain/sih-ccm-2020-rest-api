-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2020 at 01:55 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sih_ccm_2020`
--

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` varchar(255) NOT NULL,
  `fileId` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `clientId` varchar(255) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(1023) NOT NULL,
  `phoneNumber` bigint(20) NOT NULL,
  `aadharNumber` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `email`, `phoneNumber`, `aadharNumber`) VALUES
('client-in3Fl0vu1p6fmqWocE8r2fxNpb2Eg1o5', 'Ekansh Jain', 'ejekanshjain@gmail.com', 9530077351, 123456789012),
('client-cBVz2c3XlnCwBbEcdTxtriGHaTR8mxEK', 'Ekansh Jain', 'eje1kanshjain@gmail.com', 9530077351, 123456789012);

-- --------------------------------------------------------

--
-- Table structure for table `hearings`
--

CREATE TABLE `hearings` (
  `id` varchar(255) NOT NULL,
  `caseId` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lawyers`
--

CREATE TABLE `lawyers` (
  `id` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(1023) NOT NULL,
  `phoneNumber` bigint(20) NOT NULL,
  `aadharNumber` bigint(20) NOT NULL,
  `license` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lawyers`
--

INSERT INTO `lawyers` (`id`, `name`, `email`, `phoneNumber`, `aadharNumber`, `license`) VALUES
('lawyer-vau2naXRtxJ6X0jnbq74MX5I9CEDCBTi', 'Nayan Sharma', 'nayan94621@gmail.com', 9079512345, 123456789012, 12345678);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'lawyer'),
(3, 'client');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(1023) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
('admin', 'admin@admin.com', 'password', 1),
('lawyer-vau2naXRtxJ6X0jnbq74MX5I9CEDCBTi', 'nayan94621@gmail.com', 'g0wzmEq8', 2),
('client-in3Fl0vu1p6fmqWocE8r2fxNpb2Eg1o5', 'ejekanshjain@gmail.com', '2X61l571', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD UNIQUE KEY `id` (`id`,`email`) USING HASH;

--
-- Indexes for table `hearings`
--
ALTER TABLE `hearings`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `lawyers`
--
ALTER TABLE `lawyers`
  ADD UNIQUE KEY `id` (`id`,`email`,`license`) USING HASH;

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `id` (`id`,`email`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
