-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2025 at 07:13 PM
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
-- Database: `comlab_barkadista`
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
('admin', '2847aacde5edf0574094194eec764973', 'Fortune', 'Bermudez'),
('admin099', 'd3532ad0a53ebe63530d6b77374420b4', 'Carl Arvin', 'Hipolito'),
('amongus', '083448e46c75f0c5c3e7fec8b1f78b9f', 'Neil ', 'Baltar');

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
(60, 115, NULL, 1, NULL, 1, NULL, 1, NULL),
(61, 117, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(62, 118, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(63, 119, 1, NULL, NULL, NULL, NULL, NULL, NULL);

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
(65, 115, 408, 'MB', 109, '', 'Auto resolve.', 1, '2025-02-16', '2025-02-16', 'admin099 ', 'Admin - adm'),
(66, 117, 408, 'MB', 379, 'Ayaw po gumana yung left-mouse button. Nag spa-spam click po sya kahit na di pinipindot.', 'Auto resolve.', 1, '2025-02-25', '2025-02-26', 'amongus ', 'Admin - amo'),
(67, 118, 408, 'MB', 462, 'Mouse is double clicking', 'Auto resolve.', 1, '2025-02-26', '2025-02-26', 'admin ', 'Admin - adm'),
(68, 119, 408, 'MB', 462, 'Mouse is double clicking', 'Auto resolve.', 1, '2025-02-26', '2025-02-26', 'admin ', 'Admin - adm');

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
('MND', 'Mendiola Building');

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
(460, 1, 'SYU-001', 'MON-001', 1, 1, 1, 1, 1, 0),
(461, 1, 'SYU-002', 'MON-002', 1, 1, 1, 1, 1, 0),
(462, 1, 'SYU-003', 'MON-003', 1, 1, 1, 1, 1, 0),
(463, 1, 'SYU-004', 'MON-004', 1, 1, 1, 1, 1, 1),
(464, 1, 'SYU-005', 'MON-005', 1, 1, 1, 1, 1, 0),
(465, 1, 'SYU-006', 'MON-006', 1, 1, 1, 1, 1, 3),
(466, 1, 'SYU-007', 'MON-007', 1, 1, 1, 1, 1, 0),
(467, 1, 'SYU-008', 'MON-008', 1, 1, 1, 1, 1, 0),
(468, 1, 'SYU-009', 'MON-009', 1, 1, 1, 1, 1, 0),
(469, 1, 'SYU-010', 'MON-010', 1, 1, 1, 1, 1, 2),
(470, 1, 'SYU-011', 'MON-011', 1, 1, 1, 1, 1, 1),
(471, 1, 'SYU-012', 'MON-012', 1, 1, 1, 1, 1, 0),
(472, 1, 'SYU-013', 'MON-013', 1, 1, 1, 1, 1, 0),
(473, 1, 'SYU-014', 'MON-014', 1, 1, 1, 1, 1, 0),
(474, 1, 'SYU-015', 'MON-015', 1, 1, 1, 1, 1, 0),
(475, 1, 'SYU-016', 'MON-016', 1, 1, 1, 1, 1, 3),
(476, 1, 'SYU-017', 'MON-017', 1, 1, 1, 1, 1, 3),
(477, 1, 'SYU-018', 'MON-018', 1, 1, 1, 1, 1, 0),
(478, 1, 'SYU-019', 'MON-019', 1, 1, 1, 1, 1, 0),
(479, 1, 'SYU-020', 'MON-020', 1, 1, 1, 1, 1, 1),
(480, 1, 'SYU-021', 'MON-021', 1, 1, 1, 1, 1, 0),
(481, 1, 'SYU-022', 'MON-022', 1, 1, 1, 1, 1, 0),
(482, 1, 'SYU-023', 'MON-023', 1, 1, 1, 1, 1, 0),
(483, 1, 'SYU-024', 'MON-024', 1, 1, 1, 1, 1, 0),
(484, 1, 'SYU-025', 'MON-025', 1, 1, 1, 1, 1, 0),
(485, 1, 'SYU-026', 'MON-026', 1, 1, 1, 1, 1, 0),
(486, 1, 'SYU-027', 'MON-027', 1, 1, 1, 1, 1, 0),
(487, 1, 'SYU-028', 'MON-028', 1, 1, 1, 1, 1, 0),
(488, 1, 'SYU-029', 'MON-029', 1, 1, 1, 1, 1, 0),
(489, 1, 'SYU-030', 'MON-030', 1, 1, 1, 1, 1, 0),
(490, 1, 'SYU-031', 'MON-031', 1, 1, 1, 1, 1, 0),
(491, 1, 'SYU-032', 'MON-032', 1, 1, 1, 1, 1, 0),
(492, 1, 'SYU-033', 'MON-033', 1, 1, 1, 1, 1, 0),
(493, 1, 'SYU-034', 'MON-034', 1, 1, 1, 1, 1, 0),
(494, 1, 'SYU-035', 'MON-035', 1, 1, 1, 1, 1, 0),
(495, 1, 'SYU-036', 'MON-036', 1, 1, 1, 1, 1, 2),
(496, 1, 'SYU-037', 'MON-037', 1, 1, 1, 1, 1, 0),
(497, 1, 'SYU-038', 'MON-038', 1, 1, 1, 1, 1, 0),
(498, 1, 'SYU-039', 'MON-039', 1, 1, 1, 1, 1, 0),
(499, 1, 'SYU-040', 'MON-040', 1, 1, 1, 1, 1, 0),
(500, 2, 'SYU-041', 'MON-041', 1, 1, 1, 1, 1, 0),
(501, 2, 'SYU-042', 'MON-042', 1, 1, 1, 1, 1, 0),
(502, 2, 'SYU-043', 'MON-043', 1, 1, 1, 1, 1, 0),
(503, 2, 'SYU-044', 'MON-044', 1, 1, 1, 1, 1, 1),
(504, 2, 'SYU-045', 'MON-045', 1, 1, 1, 1, 1, 0),
(505, 2, 'SYU-046', 'MON-046', 1, 1, 1, 1, 1, 2),
(506, 2, 'SYU-047', 'MON-047', 1, 1, 1, 1, 1, 0),
(507, 2, 'SYU-048', 'MON-048', 1, 1, 1, 1, 1, 0),
(508, 2, 'SYU-049', 'MON-049', 1, 1, 1, 1, 1, 0),
(509, 2, 'SYU-050', 'MON-050', 1, 1, 1, 1, 1, 0),
(510, 2, 'SYU-051', 'MON-051', 1, 1, 1, 1, 1, 0),
(511, 2, 'SYU-052', 'MON-052', 1, 1, 1, 1, 1, 1),
(512, 2, 'SYU-053', 'MON-053', 1, 1, 1, 1, 1, 0),
(513, 2, 'SYU-054', 'MON-054', 1, 1, 1, 1, 1, 2),
(514, 2, 'SYU-055', 'MON-055', 1, 1, 1, 1, 1, 0),
(515, 2, 'SYU-056', 'MON-056', 1, 1, 1, 1, 1, 0),
(516, 2, 'SYU-057', 'MON-057', 1, 1, 1, 1, 1, 0),
(517, 2, 'SYU-058', 'MON-058', 1, 1, 1, 1, 1, 0),
(518, 2, 'SYU-059', 'MON-059', 1, 1, 1, 1, 1, 1),
(519, 2, 'SYU-060', 'MON-060', 1, 1, 1, 1, 1, 0),
(520, 2, 'SYU-061', 'MON-061', 1, 1, 1, 1, 1, 0),
(521, 2, 'SYU-062', 'MON-062', 1, 1, 1, 1, 1, 0),
(522, 2, 'SYU-063', 'MON-063', 1, 1, 1, 1, 1, 0),
(523, 2, 'SYU-064', 'MON-064', 1, 1, 1, 1, 1, 0),
(524, 2, 'SYU-065', 'MON-065', 1, 1, 1, 1, 1, 0),
(525, 2, 'SYU-066', 'MON-066', 1, 1, 1, 1, 1, 0),
(526, 2, 'SYU-067', 'MON-067', 1, 1, 1, 1, 1, 0),
(527, 2, 'SYU-068', 'MON-068', 1, 1, 1, 1, 1, 0),
(528, 2, 'SYU-069', 'MON-069', 1, 1, 1, 1, 1, 0),
(529, 2, 'SYU-070', 'MON-070', 1, 1, 1, 1, 1, 0),
(530, 2, 'SYU-071', 'MON-071', 1, 1, 1, 1, 1, 0),
(531, 2, 'SYU-072', 'MON-072', 1, 1, 1, 1, 1, 0),
(532, 2, 'SYU-073', 'MON-073', 1, 1, 1, 1, 1, 0),
(533, 2, 'SYU-074', 'MON-074', 1, 1, 1, 1, 1, 0),
(534, 2, 'SYU-075', 'MON-075', 1, 1, 1, 1, 1, 0),
(535, 2, 'SYU-076', 'MON-076', 1, 1, 1, 1, 1, 1),
(536, 2, 'SYU-077', 'MON-077', 1, 1, 1, 1, 1, 0),
(537, 2, 'SYU-078', 'MON-078', 1, 1, 1, 1, 1, 0),
(538, 2, 'SYU-079', 'MON-079', 1, 1, 1, 1, 1, 0),
(539, 2, 'SYU-080', 'MON-080', 1, 1, 1, 1, 1, 0),
(540, 3, 'SYU-081', 'MON-081', 1, 1, 1, 1, 1, 0),
(541, 3, 'SYU-082', 'MON-082', 1, 1, 1, 1, 1, 0),
(542, 3, 'SYU-083', 'MON-083', 1, 1, 1, 1, 1, 1),
(543, 3, 'SYU-084', 'MON-084', 1, 1, 1, 1, 1, 0),
(544, 3, 'SYU-085', 'MON-085', 1, 1, 1, 1, 1, 0),
(545, 3, 'SYU-086', 'MON-086', 1, 1, 1, 1, 1, 0),
(546, 3, 'SYU-087', 'MON-087', 1, 1, 1, 1, 1, 0),
(547, 3, 'SYU-088', 'MON-088', 1, 1, 1, 1, 1, 0),
(548, 3, 'SYU-089', 'MON-089', 1, 1, 1, 1, 1, 0),
(549, 3, 'SYU-090', 'MON-090', 1, 1, 1, 1, 1, 0),
(550, 3, 'SYU-091', 'MON-091', 1, 1, 1, 1, 1, 3),
(551, 3, 'SYU-092', 'MON-092', 1, 1, 1, 1, 1, 0),
(552, 3, 'SYU-093', 'MON-093', 1, 1, 1, 1, 1, 0),
(553, 3, 'SYU-094', 'MON-094', 1, 1, 1, 1, 1, 1),
(554, 3, 'SYU-095', 'MON-095', 1, 1, 1, 1, 1, 1),
(555, 3, 'SYU-096', 'MON-096', 1, 1, 1, 1, 1, 0),
(556, 3, 'SYU-097', 'MON-097', 1, 1, 1, 1, 1, 2),
(557, 3, 'SYU-098', 'MON-098', 1, 1, 1, 1, 1, 0),
(558, 3, 'SYU-099', 'MON-099', 1, 1, 1, 1, 1, 0),
(559, 3, 'SYU-100', 'MON-100', 1, 1, 1, 1, 1, 0),
(560, 3, 'SYU-101', 'MON-101', 1, 1, 1, 1, 1, 0),
(561, 3, 'SYU-102', 'MON-102', 1, 1, 1, 1, 1, 0),
(562, 3, 'SYU-103', 'MON-103', 1, 1, 1, 1, 1, 0),
(563, 3, 'SYU-104', 'MON-104', 1, 1, 1, 1, 1, 0),
(564, 3, 'SYU-105', 'MON-105', 1, 1, 1, 1, 1, 0),
(565, 3, 'SYU-106', 'MON-106', 1, 1, 1, 1, 1, 0),
(566, 3, 'SYU-107', 'MON-107', 1, 1, 1, 1, 1, 0),
(567, 3, 'SYU-108', 'MON-108', 1, 1, 1, 1, 1, 0),
(568, 3, 'SYU-109', 'MON-109', 1, 1, 1, 1, 1, 0),
(569, 3, 'SYU-110', 'MON-110', 1, 1, 1, 1, 1, 0),
(570, 3, 'SYU-111', 'MON-111', 1, 1, 1, 1, 1, 0),
(571, 3, 'SYU-112', 'MON-112', 1, 1, 1, 1, 1, 0),
(572, 3, 'SYU-113', 'MON-113', 1, 1, 1, 1, 1, 0),
(573, 3, 'SYU-114', 'MON-114', 1, 1, 1, 1, 1, 0),
(574, 3, 'SYU-115', 'MON-115', 1, 1, 1, 1, 1, 0),
(575, 3, 'SYU-116', 'MON-116', 1, 1, 1, 1, 1, 0),
(576, 3, 'SYU-117', 'MON-117', 1, 1, 1, 1, 1, 0),
(577, 3, 'SYU-118', 'MON-118', 1, 1, 1, 1, 1, 0),
(578, 3, 'SYU-119', 'MON-119', 1, 1, 1, 1, 1, 1),
(579, 3, 'SYU-120', 'MON-120', 1, 1, 1, 1, 1, 0),
(580, 4, 'SYU-121', 'MON-121', 1, 1, 1, 1, 1, 0),
(581, 4, 'SYU-122', 'MON-122', 1, 1, 1, 1, 1, 0),
(582, 4, 'SYU-123', 'MON-123', 1, 1, 1, 1, 1, 0),
(583, 4, 'SYU-124', 'MON-124', 1, 1, 1, 1, 1, 0),
(584, 4, 'SYU-125', 'MON-125', 1, 1, 1, 1, 1, 1),
(585, 4, 'SYU-126', 'MON-126', 1, 1, 1, 1, 1, 3),
(586, 4, 'SYU-127', 'MON-127', 1, 1, 1, 1, 1, 0),
(587, 4, 'SYU-128', 'MON-128', 1, 1, 1, 1, 1, 0),
(588, 4, 'SYU-129', 'MON-129', 1, 1, 1, 1, 1, 0),
(589, 4, 'SYU-130', 'MON-130', 1, 1, 1, 1, 1, 0),
(590, 4, 'SYU-131', 'MON-131', 1, 1, 1, 1, 1, 0),
(591, 4, 'SYU-132', 'MON-132', 1, 1, 1, 1, 1, 0),
(592, 4, 'SYU-133', 'MON-133', 1, 1, 1, 1, 1, 0),
(593, 4, 'SYU-134', 'MON-134', 1, 1, 1, 1, 1, 0),
(594, 4, 'SYU-135', 'MON-135', 1, 1, 1, 1, 1, 0),
(595, 4, 'SYU-136', 'MON-136', 1, 1, 1, 1, 1, 3),
(596, 4, 'SYU-137', 'MON-137', 1, 1, 1, 1, 1, 0),
(597, 4, 'SYU-138', 'MON-138', 1, 1, 1, 1, 1, 1),
(598, 4, 'SYU-139', 'MON-139', 1, 1, 1, 1, 1, 0),
(599, 4, 'SYU-140', 'MON-140', 1, 1, 1, 1, 1, 0),
(600, 4, 'SYU-141', 'MON-141', 1, 1, 1, 1, 1, 0),
(601, 4, 'SYU-142', 'MON-142', 1, 1, 1, 1, 1, 0),
(602, 4, 'SYU-143', 'MON-143', 1, 1, 1, 1, 1, 1),
(603, 4, 'SYU-144', 'MON-144', 1, 1, 1, 1, 1, 0),
(604, 4, 'SYU-145', 'MON-145', 1, 1, 1, 1, 1, 0),
(605, 4, 'SYU-146', 'MON-146', 1, 1, 1, 1, 1, 0),
(606, 4, 'SYU-147', 'MON-147', 1, 1, 1, 1, 1, 0),
(607, 4, 'SYU-148', 'MON-148', 1, 1, 1, 1, 1, 0),
(608, 4, 'SYU-149', 'MON-149', 1, 1, 1, 1, 1, 0),
(609, 4, 'SYU-150', 'MON-150', 1, 1, 1, 1, 1, 0),
(610, 4, 'SYU-151', 'MON-151', 1, 1, 1, 1, 1, 0),
(611, 4, 'SYU-152', 'MON-152', 1, 1, 1, 1, 1, 0),
(612, 4, 'SYU-153', 'MON-153', 1, 1, 1, 1, 1, 0),
(613, 4, 'SYU-154', 'MON-154', 1, 1, 1, 1, 1, 0),
(614, 4, 'SYU-155', 'MON-155', 1, 1, 1, 1, 1, 0),
(615, 4, 'SYU-156', 'MON-156', 1, 1, 1, 1, 1, 0),
(616, 4, 'SYU-157', 'MON-157', 1, 1, 1, 1, 1, 0),
(617, 4, 'SYU-158', 'MON-158', 1, 1, 1, 1, 1, 0),
(618, 4, 'SYU-159', 'MON-159', 1, 1, 1, 1, 1, 0),
(619, 4, 'SYU-160', 'MON-160', 1, 1, 1, 1, 1, 0),
(781, 5, 'SYU-161', 'MON-161', 1, 1, 1, 1, 1, 0),
(782, 5, 'SYU-162', 'MON-162', 1, 1, 1, 1, 1, 1),
(783, 5, 'SYU-163', 'MON-163', 1, 1, 1, 1, 1, 0),
(784, 5, 'SYU-164', 'MON-164', 1, 1, 1, 1, 1, 0),
(785, 5, 'SYU-165', 'MON-165', 1, 1, 1, 1, 1, 0),
(786, 5, 'SYU-166', 'MON-166', 1, 1, 1, 1, 1, 0),
(787, 5, 'SYU-167', 'MON-167', 1, 1, 1, 1, 1, 3),
(788, 5, 'SYU-168', 'MON-168', 1, 1, 1, 1, 1, 0),
(789, 5, 'SYU-169', 'MON-169', 1, 1, 1, 1, 1, 0),
(790, 5, 'SYU-170', 'MON-170', 1, 1, 1, 1, 1, 0),
(791, 5, 'SYU-171', 'MON-171', 1, 1, 1, 1, 1, 0),
(792, 5, 'SYU-172', 'MON-172', 1, 1, 1, 1, 1, 0),
(793, 5, 'SYU-173', 'MON-173', 1, 1, 1, 1, 1, 0),
(794, 5, 'SYU-174', 'MON-174', 1, 1, 1, 1, 1, 0),
(795, 5, 'SYU-175', 'MON-175', 1, 1, 1, 1, 1, 0),
(796, 5, 'SYU-176', 'MON-176', 1, 1, 1, 1, 1, 1),
(797, 5, 'SYU-177', 'MON-177', 1, 1, 1, 1, 1, 0),
(798, 5, 'SYU-178', 'MON-178', 1, 1, 1, 1, 1, 0),
(799, 5, 'SYU-179', 'MON-179', 1, 1, 1, 1, 1, 0),
(800, 5, 'SYU-180', 'MON-180', 1, 1, 1, 1, 1, 0),
(801, 5, 'SYU-181', 'MON-181', 1, 1, 1, 1, 1, 0),
(802, 5, 'SYU-182', 'MON-182', 1, 1, 1, 1, 1, 0),
(803, 5, 'SYU-183', 'MON-183', 1, 1, 1, 1, 1, 2),
(804, 5, 'SYU-184', 'MON-184', 1, 1, 1, 1, 1, 0),
(805, 5, 'SYU-185', 'MON-185', 1, 1, 1, 1, 1, 0),
(806, 5, 'SYU-186', 'MON-186', 1, 1, 1, 1, 1, 0),
(807, 5, 'SYU-187', 'MON-187', 1, 1, 1, 1, 1, 0),
(808, 5, 'SYU-188', 'MON-188', 1, 1, 1, 1, 1, 0),
(809, 5, 'SYU-189', 'MON-189', 1, 1, 1, 1, 1, 0),
(810, 5, 'SYU-190', 'MON-190', 1, 1, 1, 1, 1, 0),
(811, 5, 'SYU-191', 'MON-191', 1, 1, 1, 1, 1, 1),
(812, 5, 'SYU-192', 'MON-192', 1, 1, 1, 1, 1, 0),
(813, 5, 'SYU-193', 'MON-193', 1, 1, 1, 1, 1, 0),
(814, 5, 'SYU-194', 'MON-194', 1, 1, 1, 1, 1, 0),
(815, 5, 'SYU-195', 'MON-195', 1, 1, 1, 1, 1, 0),
(816, 5, 'SYU-196', 'MON-196', 1, 1, 1, 1, 1, 0),
(817, 5, 'SYU-197', 'MON-197', 1, 1, 1, 1, 1, 0),
(818, 5, 'SYU-198', 'MON-198', 1, 1, 1, 1, 1, 0),
(819, 5, 'SYU-199', 'MON-199', 1, 1, 1, 1, 1, 1),
(820, 5, 'SYU-200', 'MON-200', 1, 1, 1, 1, 1, 0),
(821, 6, 'SYU-201', 'MON-201', 1, 1, 1, 1, 1, 0),
(822, 6, 'SYU-202', 'MON-202', 1, 1, 1, 1, 1, 0),
(823, 6, 'SYU-203', 'MON-203', 1, 1, 1, 1, 1, 0),
(824, 6, 'SYU-204', 'MON-204', 1, 1, 1, 1, 1, 0),
(825, 6, 'SYU-205', 'MON-205', 1, 1, 1, 1, 1, 3),
(826, 6, 'SYU-206', 'MON-206', 1, 1, 1, 1, 1, 3),
(827, 6, 'SYU-207', 'MON-207', 1, 1, 1, 1, 1, 0),
(828, 6, 'SYU-208', 'MON-208', 1, 1, 1, 1, 1, 0),
(829, 6, 'SYU-209', 'MON-209', 1, 1, 1, 1, 1, 0),
(830, 6, 'SYU-210', 'MON-210', 1, 1, 1, 1, 1, 0),
(831, 6, 'SYU-211', 'MON-211', 1, 1, 1, 1, 1, 0),
(832, 6, 'SYU-212', 'MON-212', 1, 1, 1, 1, 1, 0),
(833, 6, 'SYU-213', 'MON-213', 1, 1, 1, 1, 1, 0),
(834, 6, 'SYU-214', 'MON-214', 1, 1, 1, 1, 1, 0),
(835, 6, 'SYU-215', 'MON-215', 1, 1, 1, 1, 1, 0),
(836, 6, 'SYU-216', 'MON-216', 1, 1, 1, 1, 1, 2),
(837, 6, 'SYU-217', 'MON-217', 1, 1, 1, 1, 1, 0),
(838, 6, 'SYU-218', 'MON-218', 1, 1, 1, 1, 1, 1),
(839, 6, 'SYU-219', 'MON-219', 1, 1, 1, 1, 1, 0),
(840, 6, 'SYU-220', 'MON-220', 1, 1, 1, 1, 1, 0),
(841, 6, 'SYU-221', 'MON-221', 1, 1, 1, 1, 1, 0),
(842, 6, 'SYU-222', 'MON-222', 1, 1, 1, 1, 1, 0),
(843, 6, 'SYU-223', 'MON-223', 1, 1, 1, 1, 1, 2),
(844, 6, 'SYU-224', 'MON-224', 1, 1, 1, 1, 1, 0),
(845, 6, 'SYU-225', 'MON-225', 1, 1, 1, 1, 1, 0),
(846, 6, 'SYU-226', 'MON-226', 1, 1, 1, 1, 1, 0),
(847, 6, 'SYU-227', 'MON-227', 1, 1, 1, 1, 1, 0),
(848, 6, 'SYU-228', 'MON-228', 1, 1, 1, 1, 1, 0),
(849, 6, 'SYU-229', 'MON-229', 1, 1, 1, 1, 1, 0),
(850, 6, 'SYU-230', 'MON-230', 1, 1, 1, 1, 1, 0),
(851, 6, 'SYU-231', 'MON-231', 1, 1, 1, 1, 1, 0),
(852, 6, 'SYU-232', 'MON-232', 1, 1, 1, 1, 1, 0),
(853, 6, 'SYU-233', 'MON-233', 1, 1, 1, 1, 1, 0),
(854, 6, 'SYU-234', 'MON-234', 1, 1, 1, 1, 1, 0),
(855, 6, 'SYU-235', 'MON-235', 1, 1, 1, 1, 1, 0),
(856, 6, 'SYU-236', 'MON-236', 1, 1, 1, 1, 1, 0),
(857, 6, 'SYU-237', 'MON-237', 1, 1, 1, 1, 1, 0),
(858, 6, 'SYU-238', 'MON-238', 1, 1, 1, 1, 1, 0),
(859, 6, 'SYU-239', 'MON-239', 1, 1, 1, 1, 1, 2),
(860, 6, 'SYU-240', 'MON-240', 1, 1, 1, 1, 1, 0);

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
(19, 120, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 121, NULL, NULL, NULL, 2, NULL, NULL, NULL),
(21, 122, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(22, 123, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(23, 124, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(24, 125, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(25, 126, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 127, NULL, NULL, NULL, NULL, 2, NULL, NULL),
(27, 128, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(28, 129, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(29, 130, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 131, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(31, 132, NULL, NULL, NULL, NULL, NULL, 2, NULL),
(32, 133, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(33, 134, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(34, 135, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 136, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(36, 137, 3, 3, NULL, NULL, NULL, NULL, NULL),
(37, 138, NULL, NULL, NULL, NULL, 2, NULL, NULL),
(38, 139, NULL, NULL, 2, NULL, NULL, NULL, NULL),
(39, 140, NULL, NULL, 3, NULL, NULL, 3, NULL),
(40, 141, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(41, 142, NULL, NULL, NULL, 3, NULL, NULL, NULL),
(42, 143, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(43, 144, NULL, 3, NULL, NULL, NULL, NULL, NULL),
(44, 145, NULL, 3, NULL, NULL, NULL, NULL, NULL),
(45, 146, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(46, 147, NULL, NULL, NULL, NULL, NULL, 3, NULL),
(47, 148, NULL, NULL, 3, NULL, 3, NULL, NULL),
(48, 149, NULL, NULL, NULL, NULL, 3, NULL, NULL),
(49, 150, 3, NULL, NULL, 3, NULL, 3, NULL),
(50, 151, NULL, NULL, NULL, 3, 3, NULL, NULL),
(51, 152, NULL, 3, NULL, 3, NULL, NULL, NULL),
(52, 153, NULL, NULL, 3, NULL, 3, NULL, NULL),
(53, 154, 3, NULL, 3, NULL, NULL, NULL, NULL),
(54, 155, 3, NULL, 3, NULL, NULL, 3, NULL),
(55, 156, 3, 3, 3, 3, 3, 3, NULL),
(56, 157, 3, 3, 3, 3, 3, 3, NULL),
(57, 158, NULL, NULL, 3, 3, NULL, 3, NULL),
(58, 159, 3, 3, 3, 3, NULL, NULL, NULL),
(59, 160, NULL, NULL, 3, NULL, 3, 3, NULL);

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
(1, 408, 'MB', 40, 40, 0, 2, 3, 11),
(2, 410, 'MB', 40, 40, 0, 2, 4, 6),
(3, 701, 'ANB', 40, 40, 0, 1, 4, 6),
(4, 702, 'ANB', 40, 40, 0, 0, 3, 6),
(5, 101, 'MND', 40, 40, 0, 1, 4, 6),
(6, 102, 'MND', 40, 40, 0, 3, 1, 6);

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
('MON-003', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-004', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-005', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-006', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-007', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-008', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-009', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-010', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-011', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-012', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-013', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-014', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-015', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-016', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-017', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-018', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-019', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-020', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-021', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-022', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-023', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-024', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-025', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-026', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-027', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-028', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-029', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-030', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-031', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-032', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-033', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-034', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-035', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-036', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-037', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-038', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-039', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-040', 2, '408MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-041', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-042', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-043', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-044', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-045', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-046', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-047', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-048', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-049', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-050', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-051', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-052', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-053', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-054', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-055', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-056', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-057', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-058', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-059', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-060', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-061', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-062', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-063', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-064', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-065', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-066', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-067', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-068', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-069', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-070', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-071', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-072', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-073', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-074', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-075', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-076', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-077', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-078', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-079', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-080', 2, '410MB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-081', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-082', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-083', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-084', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-085', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-086', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-087', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-088', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-089', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-090', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-091', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-092', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-093', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-094', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-095', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-096', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-097', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-098', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-099', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-100', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-101', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-102', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-103', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-104', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-105', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-106', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-107', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-108', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-109', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-110', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-111', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-112', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-113', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-114', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-115', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-116', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-117', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-118', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-119', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-120', 2, '701ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-121', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-122', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-123', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-124', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-125', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-126', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-127', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-128', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-129', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-130', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-131', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-132', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-133', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-134', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-135', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-136', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-137', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-138', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-139', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-140', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-141', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-142', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-143', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-144', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-145', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-146', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-147', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-148', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-149', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-150', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-151', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-152', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-153', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-154', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-155', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-156', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-157', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-158', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-159', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-160', 2, '702ANB', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-161', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-162', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-163', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-164', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-165', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-166', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-167', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-168', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-169', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-170', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-171', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-172', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-173', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-174', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-175', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-176', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-177', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-178', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-179', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-180', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-181', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-182', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-183', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-184', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-185', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-186', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-187', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-188', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-189', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-190', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-191', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-192', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-193', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-194', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-195', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-196', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-197', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-198', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-199', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-200', 2, '101MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-201', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-202', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-203', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-204', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-205', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-206', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-207', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-208', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-209', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-210', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-211', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-212', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-213', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-214', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-215', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-216', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-217', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-218', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-219', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-220', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-221', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-222', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-223', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-224', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-225', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-226', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-227', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-228', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-229', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-230', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-231', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-232', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-233', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-234', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-235', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-236', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-237', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-238', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-239', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('MON-240', 2, '102MND', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0),
('SYU-001', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-002', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-003', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-004', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-005', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-006', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-007', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-008', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-009', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-010', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-011', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-012', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-013', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-014', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-015', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-016', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-017', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-018', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-019', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-020', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-021', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-022', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-023', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-024', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-025', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-026', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-027', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-028', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-029', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-030', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-031', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-032', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-033', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-034', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-035', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-036', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-037', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-038', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-039', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-040', 1, '408MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-041', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-042', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-043', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-044', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-045', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-046', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-047', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-048', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-049', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-050', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-051', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-052', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-053', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-054', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-055', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-056', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-057', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-058', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-059', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-060', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-061', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-062', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-063', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-064', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-065', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-066', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-067', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-068', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-069', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-070', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-071', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-072', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-073', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-074', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-075', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-076', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-077', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-078', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-079', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-080', 1, '410MB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-081', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-082', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-083', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-084', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-085', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-086', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-087', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-088', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-089', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-090', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-091', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-092', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-093', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-094', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-095', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-096', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-097', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-098', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-099', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-100', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-101', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-102', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-103', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-104', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-105', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-106', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-107', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-108', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-109', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-110', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-111', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-112', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-113', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-114', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-115', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-116', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-117', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-118', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-119', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-120', 1, '701ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-121', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-122', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-123', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-124', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-125', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-126', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-127', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-128', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-129', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-130', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-131', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-132', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-133', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-134', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-135', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-136', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-137', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-138', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-139', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-140', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-141', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-142', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-143', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-144', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-145', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-146', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-147', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-148', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-149', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-150', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-151', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-152', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-153', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-154', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-155', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-156', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-157', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-158', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-159', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-160', 1, '702ANB', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-161', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-162', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-163', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-164', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-165', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-166', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-167', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-168', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-169', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-170', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-171', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-172', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-173', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-174', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-175', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-176', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-177', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-178', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-179', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-180', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-181', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-182', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-183', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-184', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-185', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-186', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-187', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-188', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-189', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-190', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-191', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-192', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-193', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-194', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-195', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-196', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-197', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-198', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-199', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-200', 1, '101MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-201', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-202', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0);
INSERT INTO `non_consumable_components` (`component_id`, `reference_id`, `location`, `specs`, `flagged`) VALUES
('SYU-203', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-204', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-205', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-206', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-207', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-208', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-209', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-210', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-211', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-212', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-213', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-214', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-215', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-216', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-217', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-218', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-219', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-220', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-221', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-222', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-223', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-224', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-225', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-226', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-227', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-228', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-229', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-230', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-231', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-232', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-233', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-234', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-235', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-236', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-237', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-238', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-239', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0),
('SYU-240', 1, '102MND', 'Intel® Core i5-7400 processor 8 GB DDR4 3200MHz 256 GB Intel® UHD Graphics Integrated high-definition', 0);

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
(109, 120, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(110, 121, NULL, NULL, NULL, 2, NULL, NULL, NULL),
(111, 122, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(112, 123, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(113, 124, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(114, 125, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(115, 126, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(116, 127, NULL, NULL, NULL, NULL, 2, NULL, NULL),
(117, 128, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(118, 129, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(119, 130, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(120, 131, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(121, 132, NULL, NULL, NULL, NULL, NULL, 2, NULL),
(122, 133, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(123, 134, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(124, 135, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(125, 136, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(126, 137, 3, 3, NULL, NULL, NULL, NULL, NULL),
(127, 138, NULL, NULL, NULL, NULL, 2, NULL, NULL),
(128, 139, NULL, NULL, 2, NULL, NULL, NULL, NULL),
(129, 140, NULL, NULL, 3, NULL, NULL, 3, NULL),
(130, 141, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(131, 142, NULL, NULL, NULL, 3, NULL, NULL, NULL),
(132, 143, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(133, 144, NULL, 3, NULL, NULL, NULL, NULL, NULL),
(134, 145, NULL, 3, NULL, NULL, NULL, NULL, NULL),
(135, 146, NULL, NULL, 3, NULL, NULL, NULL, NULL),
(136, 147, NULL, NULL, NULL, NULL, NULL, 3, NULL),
(137, 148, NULL, NULL, 3, NULL, 3, NULL, NULL),
(138, 149, NULL, NULL, NULL, NULL, 3, NULL, NULL),
(139, 150, 3, NULL, NULL, 3, NULL, 3, NULL),
(140, 151, NULL, NULL, NULL, 3, 3, NULL, NULL),
(141, 152, NULL, 3, NULL, 3, NULL, NULL, NULL),
(142, 153, NULL, NULL, 3, NULL, 3, NULL, NULL),
(143, 154, 3, NULL, 3, NULL, NULL, NULL, NULL),
(144, 155, 3, NULL, 3, NULL, NULL, 3, NULL),
(145, 156, 3, 3, 3, 3, 3, 3, NULL),
(146, 157, 3, 3, 3, 3, 3, 3, NULL),
(147, 158, NULL, NULL, 3, 3, NULL, 3, NULL),
(148, 159, 3, 3, 3, 3, NULL, NULL, NULL),
(149, 160, NULL, NULL, 3, NULL, 3, 3, NULL);

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
(120, 408, 'MB', 463, 'Mouse is double clicking', '2025-02-26', 'Admin - adm'),
(121, 408, 'MB', 479, 'The hdmi cord is missing', '2025-02-26', 'Admin - adm'),
(122, 408, 'MB', 495, 'The system unit is not booting', '2025-02-26', 'Admin - adm'),
(123, 408, 'MB', 470, 'Spacebar is missing', '2025-02-26', 'Admin - adm'),
(124, 410, 'MB', 503, 'Getting stuck when logging in ', '2025-02-26', '2022-106868'),
(125, 410, 'MB', 518, 'Monitor is flickering', '2025-02-26', '2022-104368'),
(126, 410, 'MB', 535, 'Mouse is not working. Light flashing but cursor not moving', '2025-02-26', '2022-104317'),
(127, 701, 'ANB', 542, 'Windows is freezing', '2025-02-26', '2023-107639'),
(128, 701, 'ANB', 578, 'The internet is very slow', '2025-02-26', '2023-104720'),
(129, 701, 'ANB', 556, 'System unit is displaying on monitor but displaying black screen only', '2025-02-26', '2023-104826'),
(130, 702, 'ANB', 597, 'Right click is not working', '2025-02-26', '2021-102473'),
(131, 702, 'ANB', 584, 'Expired MS office license', '2025-02-26', 'Admin - adm'),
(132, 702, 'ANB', 602, 'LAN cable is missing. Cannot connect to the internet', '2025-02-26', 'Admin - adm'),
(133, 701, 'ANB', 554, 'NUIS blocked access', '2025-02-26', 'Admin - adm'),
(134, 410, 'MB', 511, 'Letter CC on keyboard is repeated when pressing the key', '2025-02-26', 'Admin - adm'),
(135, 702, 'ANB', 597, 'Scroll wheel not functioning', '2025-02-26', 'Admin - adm'),
(136, 101, 'MND', 796, 'Anti-virus error', '2025-02-26', 'Admin - adm'),
(137, 101, 'MND', 811, 'No cables, no keyboard and mouse', '2025-02-26', 'Admin - adm'),
(138, 101, 'MND', 782, 'Security alert, update modules failed', '2025-02-26', 'Admin - adm'),
(139, 101, 'MND', 819, 'Blue screen', '2025-02-26', 'Admin - adm'),
(140, 101, 'MND', 803, 'No network and no power', '2025-02-26', 'Admin - adm'),
(141, 102, 'MND', 843, 'No desktop/pc', '2025-02-26', 'Admin - adm'),
(142, 102, 'MND', 859, 'No monitor', '2025-02-26', 'Admin - adm'),
(143, 102, 'MND', 836, 'Missing system unit', '2025-02-26', 'Admin - adm'),
(144, 102, 'MND', 838, 'Missing keyboard', '2025-02-26', 'Admin - adm'),
(145, 408, 'MB', 465, 'Missing cable', '2025-02-26', '2022-106868'),
(146, 410, 'MB', 513, 'Power cable missing', '2025-02-27', 'Admin - adm'),
(147, 701, 'ANB', 553, 'Computer cannot connect to the internet\n', '2025-02-27', 'Admin - adm'),
(148, 701, 'ANB', 550, 'Computer not booting, windows not installed', '2025-02-27', 'Admin - adm'),
(149, 410, 'MB', 505, 'Windows is stuck updating. ', '2025-02-27', 'Admin - adm'),
(150, 408, 'MB', 465, 'Missing monitor, no lan cable, and broken mouse', '2025-02-27', 'Admin - adm'),
(151, 102, 'MND', 825, 'Monitor is broken, windows is not booting', '2025-02-27', 'Admin - adm'),
(152, 408, 'MB', 469, 'Missing monitor and keyboard. Only desktop ', '2025-02-27', 'Admin - adm'),
(153, 702, 'ANB', 595, 'PC is overheating and there is no OS installed', '2025-02-27', 'Admin - adm'),
(154, 408, 'MB', 475, 'Computer is not displaying to monitor. Ram issues and mouse is missing a button', '2025-02-27', 'Admin - adm'),
(155, 408, 'MB', 475, 'Computer not responding. Freezing and cant connect to internet. Mouse has broken cable', '2025-02-27', 'Admin - adm'),
(156, 101, 'MND', 787, 'Computer missing, monitor cracked, windows not installed, LAN cable is broken, keyboard missing keycaps, mouse is missing', '2025-02-27', 'Admin - adm'),
(157, 408, 'MB', 475, 'System unit has no cables, monitor is missing, windows stuck updating, internet is down, keyboard missing cables, mouse has no scroll wheel', '2025-02-27', 'Admin - adm'),
(158, 408, 'MB', 476, 'Desktop is missing, monitor has no vga cable, internet LAN cable is missing', '2025-02-27', 'Admin - adm'),
(159, 702, 'ANB', 585, 'System unit not powering on, monitor is stuck on black screen, keyboard and mouse missing important buttons', '2025-02-27', 'Admin - adm'),
(160, 102, 'MND', 826, 'System unit is missing, computer has no teams installed, cannot install teams because slow internet', '2025-02-27', 'Admin - adm');

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
  MODIFY `archived_reported_components_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `archived_reports`
--
ALTER TABLE `archived_reports`
  MODIFY `archived_report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `computers`
--
ALTER TABLE `computers`
  MODIFY `computer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=861;

--
-- AUTO_INCREMENT for table `current_reported_components`
--
ALTER TABLE `current_reported_components`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `laboratories`
--
ALTER TABLE `laboratories`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `reported_components`
--
ALTER TABLE `reported_components`
  MODIFY `reported_components_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

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
