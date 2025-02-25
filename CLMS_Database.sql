-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2025 at 01:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comlab_db_experimental`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `password`, `first_name`, `last_name`) VALUES
('admin099', 'd3532ad0a53ebe63530d6b77374420b4', 'Carl Arvin', 'Hipolito');

-- --------------------------------------------------------

--
-- Table structure for table `archived_reported_components`
--

CREATE TABLE `archived_reported_components` (
  `archived_reported_components_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `mouse` int(1) DEFAULT NULL,
  `keyboard` int(1) DEFAULT NULL,
  `system_unit` int(1) DEFAULT NULL,
  `monitor` int(1) DEFAULT NULL,
  `software` int(1) DEFAULT NULL,
  `internet` int(1) DEFAULT NULL,
  `other` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `archived_reported_components`
--

INSERT INTO `archived_reported_components` (`archived_reported_components_id`, `report_id`, `mouse`, `keyboard`, `system_unit`, `monitor`, `software`, `internet`, `other`) VALUES
(57, 112, 1, NULL, NULL, NULL, NULL, 3, NULL),
(58, 113, NULL, 1, 2, NULL, 1, NULL, NULL),
(59, 114, 1, NULL, NULL, 2, NULL, 1, NULL),
(60, 115, NULL, 1, NULL, 1, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `archived_reports`
--

CREATE TABLE `archived_reports` (
  `archived_report_id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `room` int(3) DEFAULT NULL,
  `building_code` varchar(3) NOT NULL,
  `computer_id` int(11) DEFAULT NULL,
  `report_comment` text DEFAULT NULL,
  `resolve_comment` text DEFAULT NULL,
  `report_status` tinyint(1) DEFAULT NULL,
  `date_submitted` date DEFAULT NULL,
  `date_resolve` date DEFAULT curdate(),
  `resolve_by` varchar(50) DEFAULT NULL,
  `submittee` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `archived_reports`
--

INSERT INTO `archived_reports` (`archived_report_id`, `report_id`, `room`, `building_code`, `computer_id`, `report_comment`, `resolve_comment`, `report_status`, `date_submitted`, `date_resolve`, `resolve_by`, `submittee`) VALUES
(62, 112, 408, 'MB', 107, 'bad internet and defective mouse', 'fake report', 0, '2025-02-16', '2025-02-16', '2922RPM106672', 'Admin - 292'),
(63, 113, 100, 'MB', 125, 'ascdascas', 'already fixed', 1, '2025-02-16', '2025-02-16', 'admin099', 'Admin - adm'),
(64, 114, 408, 'MB', 109, ':P', 'Auto resolve.', 1, '2025-02-16', '2025-02-16', 'admin099 ', 'student1059'),
(65, 115, 408, 'MB', 109, '', 'Auto resolve.', 1, '2025-02-16', '2025-02-16', 'admin099 ', 'Admin - adm');

-- --------------------------------------------------------

--
-- Table structure for table `building_reference`
--

CREATE TABLE `building_reference` (
  `building_code` varchar(3) NOT NULL,
  `building_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `building_reference`
--

INSERT INTO `building_reference` (`building_code`, `building_name`) VALUES
('ANB', 'Annex Building'),
('MB', 'Main Building'),
('MND', 'Mendiola Building'),
('SB1', 'Sample Building 1');

-- --------------------------------------------------------

--
-- Table structure for table `components_condition`
--

CREATE TABLE `components_condition` (
  `computer_id` int(11) DEFAULT NULL,
  `system_unit_condition` tinyint(1) DEFAULT NULL,
  `monitor_condition` tinyint(1) DEFAULT NULL,
  `mouse_condition` tinyint(1) DEFAULT NULL,
  `keyboard_condition` tinyint(1) DEFAULT NULL,
  `network_condition` tinyint(1) DEFAULT NULL,
  `software_condition` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `components_condition`
--

INSERT INTO `components_condition` (`computer_id`, `system_unit_condition`, `monitor_condition`, `mouse_condition`, `keyboard_condition`, `network_condition`, `software_condition`) VALUES
(107, 1, 1, 0, 0, 1, 1),
(109, 0, 0, 0, 0, 0, 0),
(111, 0, 0, 0, 0, 0, 0),
(112, 0, 0, 0, 0, 0, 0),
(114, 0, 0, 0, 0, 0, 0),
(118, 0, 0, 0, 0, 0, 0),
(119, 0, 0, 0, 0, 0, 0),
(123, 0, 0, 0, 0, 0, 0),
(124, 0, 0, 0, 0, 0, 0),
(125, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `components_reference`
--

CREATE TABLE `components_reference` (
  `reference_id` tinyint(1) NOT NULL,
  `component_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `components_reference`
--

INSERT INTO `components_reference` (`reference_id`, `component_name`) VALUES
(1, 'system unit'),
(2, 'monitor'),
(3, 'mouse'),
(4, 'keyboard'),
(5, 'product key');

-- --------------------------------------------------------

--
-- Table structure for table `computers`
--

CREATE TABLE `computers` (
  `computer_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `system_unit` varchar(20) DEFAULT NULL,
  `monitor` varchar(20) DEFAULT NULL,
  `has_mouse` tinyint(1) DEFAULT NULL,
  `has_keyboard` tinyint(1) DEFAULT NULL,
  `has_internet` tinyint(1) DEFAULT NULL,
  `has_software` tinyint(1) DEFAULT NULL,
  `computer_status` tinyint(1) DEFAULT NULL,
  `condition_id` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `computers`
--

INSERT INTO `computers` (`computer_id`, `room_id`, `system_unit`, `monitor`, `has_mouse`, `has_keyboard`, `has_internet`, `has_software`, `computer_status`, `condition_id`) VALUES
(107, 71, 'SYU-001', 'MON-001', 1, 1, 1, 1, 1, 2),
(109, 71, 'SYU-002', 'MON-002', 1, 1, 1, 1, 1, 0),
(111, 72, 'SYU-007', 'MON-010', 1, 1, 1, 1, 1, 0),
(112, 72, 'SYU-015', 'MON-015', 1, 1, 1, 1, 1, 0),
(114, 73, 'SYU-004', 'MON-004', 1, 1, 1, 1, 1, 0),
(118, 74, 'SYU-006', 'MON-006', 1, 1, 1, 1, 1, 0),
(119, 73, 'SYU-008', 'MON-008', 1, 1, 1, 1, 1, 0),
(123, 74, 'SYU-003', 'MON-003', 1, 1, 1, 1, 1, 0),
(124, 75, 'SYU-101', 'MON-101', 1, 1, 1, 1, 1, 0),
(125, 75, 'SYU-100', 'MON-100', 1, 1, 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `condition_reference`
--

CREATE TABLE `condition_reference` (
  `condition_id` tinyint(1) NOT NULL,
  `condition_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `condition_reference`
--

INSERT INTO `condition_reference` (`condition_id`, `condition_name`) VALUES
(0, 'good'),
(1, 'minor issue'),
(2, 'major issue'),
(3, 'bad');

-- --------------------------------------------------------

--
-- Table structure for table `consumable_components`
--

CREATE TABLE `consumable_components` (
  `reference_id` tinyint(1) DEFAULT NULL,
  `stock_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumable_components`
--

INSERT INTO `consumable_components` (`reference_id`, `stock_count`) VALUES
(3, 88),
(4, 266),
(5, 965);

-- --------------------------------------------------------

--
-- Table structure for table `current_reported_components`
--

CREATE TABLE `current_reported_components` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `mouse` int(1) DEFAULT NULL,
  `keyboard` int(1) DEFAULT NULL,
  `system_unit` int(1) DEFAULT NULL,
  `monitor` int(1) DEFAULT NULL,
  `software` int(1) DEFAULT NULL,
  `internet` int(1) DEFAULT NULL,
  `other` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `current_reported_components`
--

INSERT INTO `current_reported_components` (`id`, `report_id`, `mouse`, `keyboard`, `system_unit`, `monitor`, `software`, `internet`, `other`) VALUES
(15, 116, NULL, NULL, 1, 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `laboratories`
--

CREATE TABLE `laboratories` (
  `room_id` int(11) NOT NULL,
  `room` int(3) NOT NULL,
  `building_code` varchar(3) DEFAULT NULL,
  `total_pc` int(5) DEFAULT NULL,
  `total_active_pc` int(5) DEFAULT NULL,
  `total_inactive_pc` int(5) DEFAULT NULL,
  `total_major_issue` int(5) DEFAULT NULL,
  `total_minor_issue` int(5) DEFAULT NULL,
  `total_reports` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laboratories`
--

INSERT INTO `laboratories` (`room_id`, `room`, `building_code`, `total_pc`, `total_active_pc`, `total_inactive_pc`, `total_major_issue`, `total_minor_issue`, `total_reports`) VALUES
(71, 408, 'MB', 2, 2, 0, 1, 0, 1),
(72, 515, 'MB', 2, 2, 0, 0, 0, 0),
(73, 100, 'ANB', 2, 2, 0, 0, 0, 0),
(74, 408, 'ANB', 2, 2, 0, 0, 0, 0),
(75, 100, 'MB', 2, 2, 0, 0, 0, 0),
(76, 414, 'MB', 0, 0, 0, 0, 0, 0),
(77, 415, 'MB', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `non_consumable_components`
--

CREATE TABLE `non_consumable_components` (
  `component_id` varchar(20) NOT NULL,
  `reference_id` tinyint(1) DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `specs` text DEFAULT NULL,
  `flagged` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `non_consumable_components`
--

INSERT INTO `non_consumable_components` (`component_id`, `reference_id`, `location`, `specs`, `flagged`) VALUES
('MON-001', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-002', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-003', 2, '408ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-004', 2, '100ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-005', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-006', 2, '408ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-007', 2, 'Storage Room', 'monitor specs...', 0),
('MON-008', 2, '100ANB', 'monitor specs...', 0),
('MON-010', 2, '515MB', 'monitor specs...', 0),
('MON-015', 2, '515MB', 'monitor specs...', 0),
('MON-100', 2, '100MB', 'sample specs...', 0),
('MON-101', 2, '100MB', 'monitor specs...', 0),
('MON-102', 2, 'Storage Room', 'monitor specs...', 0),
('MON-103', 2, 'Storage Room', 'sample specs...', 0),
('MON-104', 2, 'Storage Room', 'sample specs...', 0),
('SYU-001', 1, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('SYU-002', 1, '408MB', 'Intel® Core i5-12400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-003', 1, '408ANB', 'Intel® Core i5-12400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-004', 1, '100ANB', 'Intel® Core i5-12400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-005', 1, '408MB', 'Intel® Core i5-12400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-006', 1, '408ANB', 'Intel® Core i5-12400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-007', 1, '515MB', 'system unit specs...', 0),
('SYU-008', 1, '100ANB', 'sample specs...', 0),
('SYU-009', 1, 'Storage Room', 'sample specs...', 0),
('SYU-015', 1, '515MB', 'sample specs...', 0),
('SYU-100', 1, '100MB', 'sample specs...', 0),
('SYU-101', 1, '100MB', 'sample specs...', 0),
('SYU-102', 1, 'Storage Room', 'sample specs...', 0),
('SYU-103', 1, 'Storage Room', 'sample specs...', 0),
('SYU-104', 1, 'Storage Room', 'sample specs...', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reported_components`
--

CREATE TABLE `reported_components` (
  `reported_components_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `mouse` int(1) DEFAULT NULL,
  `keyboard` int(1) DEFAULT NULL,
  `system_unit` int(1) DEFAULT NULL,
  `monitor` int(1) DEFAULT NULL,
  `software` int(1) DEFAULT NULL,
  `internet` int(1) DEFAULT NULL,
  `other` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reported_components`
--

INSERT INTO `reported_components` (`reported_components_id`, `report_id`, `mouse`, `keyboard`, `system_unit`, `monitor`, `software`, `internet`, `other`) VALUES
(105, 116, NULL, NULL, 1, 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `room` int(3) DEFAULT NULL,
  `building_code` varchar(3) NOT NULL,
  `computer_id` int(11) DEFAULT NULL,
  `report_comment` text DEFAULT NULL,
  `date_submitted` date DEFAULT curdate(),
  `submittee` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `room`, `building_code`, `computer_id`, `report_comment`, `date_submitted`, `submittee`) VALUES
(116, 408, 'MB', 107, '', '2025-02-16', 'Admin - adm');

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `id` int(11) NOT NULL,
  `activation_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verification`
--

INSERT INTO `verification` (`id`, `activation_code`) VALUES
(1, 'nuITSO2025');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `archived_reported_components`
--
ALTER TABLE `archived_reported_components`
  ADD PRIMARY KEY (`archived_reported_components_id`),
  ADD KEY `archived_reportcomp_to_acrhived_reports` (`report_id`);

--
-- Indexes for table `archived_reports`
--
ALTER TABLE `archived_reports`
  ADD PRIMARY KEY (`archived_report_id`),
  ADD UNIQUE KEY `report_id` (`report_id`);

--
-- Indexes for table `building_reference`
--
ALTER TABLE `building_reference`
  ADD PRIMARY KEY (`building_code`);

--
-- Indexes for table `components_condition`
--
ALTER TABLE `components_condition`
  ADD UNIQUE KEY `computer_id` (`computer_id`),
  ADD KEY `system_unit_condition` (`system_unit_condition`),
  ADD KEY `monitor_condition` (`monitor_condition`),
  ADD KEY `mouse_condition` (`mouse_condition`),
  ADD KEY `keyboard_condition` (`keyboard_condition`),
  ADD KEY `network_condition` (`network_condition`),
  ADD KEY `software_condition` (`software_condition`);

--
-- Indexes for table `components_reference`
--
ALTER TABLE `components_reference`
  ADD PRIMARY KEY (`reference_id`);

--
-- Indexes for table `computers`
--
ALTER TABLE `computers`
  ADD PRIMARY KEY (`computer_id`),
  ADD UNIQUE KEY `system_unit` (`system_unit`),
  ADD UNIQUE KEY `MONITOR` (`monitor`),
  ADD KEY `condition_id` (`condition_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `condition_reference`
--
ALTER TABLE `condition_reference`
  ADD PRIMARY KEY (`condition_id`);

--
-- Indexes for table `consumable_components`
--
ALTER TABLE `consumable_components`
  ADD UNIQUE KEY `reference_id` (`reference_id`);

--
-- Indexes for table `current_reported_components`
--
ALTER TABLE `current_reported_components`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `laboratories`
--
ALTER TABLE `laboratories`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `building_code` (`building_code`);

--
-- Indexes for table `non_consumable_components`
--
ALTER TABLE `non_consumable_components`
  ADD PRIMARY KEY (`component_id`),
  ADD KEY `reference_id` (`reference_id`);

--
-- Indexes for table `reported_components`
--
ALTER TABLE `reported_components`
  ADD PRIMARY KEY (`reported_components_id`),
  ADD KEY `reportcomp_to_reports` (`report_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `computer_id` (`computer_id`);

--
-- Indexes for table `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `confirmation_code` (`activation_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `archived_reported_components`
--
ALTER TABLE `archived_reported_components`
  MODIFY `archived_reported_components_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `archived_reports`
--
ALTER TABLE `archived_reports`
  MODIFY `archived_report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `computers`
--
ALTER TABLE `computers`
  MODIFY `computer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `current_reported_components`
--
ALTER TABLE `current_reported_components`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `laboratories`
--
ALTER TABLE `laboratories`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `reported_components`
--
ALTER TABLE `reported_components`
  MODIFY `reported_components_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `verification`
--
ALTER TABLE `verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `archived_reported_components`
--
ALTER TABLE `archived_reported_components`
  ADD CONSTRAINT `archived_reportcomp_to_acrhived_reports` FOREIGN KEY (`report_id`) REFERENCES `archived_reports` (`report_id`);

--
-- Constraints for table `components_condition`
--
ALTER TABLE `components_condition`
  ADD CONSTRAINT `components_condition_ibfk_2` FOREIGN KEY (`system_unit_condition`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `components_condition_ibfk_3` FOREIGN KEY (`monitor_condition`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `components_condition_ibfk_4` FOREIGN KEY (`mouse_condition`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `components_condition_ibfk_5` FOREIGN KEY (`keyboard_condition`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `components_condition_ibfk_6` FOREIGN KEY (`network_condition`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `components_condition_ibfk_7` FOREIGN KEY (`software_condition`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `components_condition_ibfk_8` FOREIGN KEY (`computer_id`) REFERENCES `computers` (`computer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `computers`
--
ALTER TABLE `computers`
  ADD CONSTRAINT `computers_ibfk_2` FOREIGN KEY (`system_unit`) REFERENCES `non_consumable_components` (`component_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `computers_ibfk_3` FOREIGN KEY (`monitor`) REFERENCES `non_consumable_components` (`component_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `computers_ibfk_4` FOREIGN KEY (`condition_id`) REFERENCES `condition_reference` (`condition_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `computers_ibfk_5` FOREIGN KEY (`room_id`) REFERENCES `laboratories` (`room_id`) ON UPDATE CASCADE;

--
-- Constraints for table `consumable_components`
--
ALTER TABLE `consumable_components`
  ADD CONSTRAINT `consumable_components_ibfk_1` FOREIGN KEY (`reference_id`) REFERENCES `components_reference` (`reference_id`) ON UPDATE CASCADE;

--
-- Constraints for table `current_reported_components`
--
ALTER TABLE `current_reported_components`
  ADD CONSTRAINT `current_reported_components_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`) ON DELETE CASCADE;

--
-- Constraints for table `laboratories`
--
ALTER TABLE `laboratories`
  ADD CONSTRAINT `laboratories_ibfk_1` FOREIGN KEY (`building_code`) REFERENCES `building_reference` (`building_code`) ON UPDATE CASCADE;

--
-- Constraints for table `non_consumable_components`
--
ALTER TABLE `non_consumable_components`
  ADD CONSTRAINT `non_consumable_components_ibfk_1` FOREIGN KEY (`reference_id`) REFERENCES `components_reference` (`reference_id`) ON UPDATE CASCADE;

--
-- Constraints for table `reported_components`
--
ALTER TABLE `reported_components`
  ADD CONSTRAINT `reportcomp_to_reports` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`computer_id`) REFERENCES `computers` (`computer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
