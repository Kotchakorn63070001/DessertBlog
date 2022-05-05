-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: dessertblog1
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`,`user_id`),
  KEY `fk_admin_user_id_idx` (`user_id`),
  CONSTRAINT `fk_admin_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,3,'ชนิสรา','วัชรพรกุล'),(2,5,'สวัสดี','ลาก่อน');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_report`
--

DROP TABLE IF EXISTS `admin_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_report` (
  `admin_id` int NOT NULL,
  `report_id` int NOT NULL,
  PRIMARY KEY (`admin_id`,`report_id`),
  KEY `fk_admin_report_report_idx` (`report_id`),
  CONSTRAINT `fk_admin_report_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_admin_report_report_id` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_report`
--

LOCK TABLES `admin_report` WRITE;
/*!40000 ALTER TABLE `admin_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_user_idx` (`user_id`),
  KEY `fk_comment_post_id_idx` (`post_id`),
  CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'น่าทานมากค่า ต้องลองแล้วว',2,1),(2,'ลองทำตามสูตรแล้ว อร่อยมากๆ เลยค่า ขอบคุณที่แบ่งปันสูตรนะคะ ^^',2,1),(3,'น่าทานมากเลยค่า',1,1),(4,'วิธีทำดูง่ายกว่าที่คิด ไว้จะลองทำตามนะคะ',1,2),(7,'หกกฟหาวสาวฟดาส',1,4),(8,'ต้องทำตามแล้ววว',1,4),(9,';lsdlmf;lml;dsmf',1,4),(10,'น่าทานมากๆๆเลยค่า',7,2),(11,'อยากลองทานมากเลยย',7,14),(12,'wowww',7,24),(14,'woww good job!',7,25);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `content_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  PRIMARY KEY (`content_id`),
  KEY `fk_content_post_idx` (`post_id`),
  CONSTRAINT `fk_content_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,1),(2,2),(4,4),(10,14),(14,19),(18,23),(19,24),(20,25),(25,30),(33,30),(26,31);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_cooking_method`
--

DROP TABLE IF EXISTS `content_cooking_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_cooking_method` (
  `cooking_method_no` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `cooking_method` longtext,
  PRIMARY KEY (`cooking_method_no`,`content_id`),
  KEY `fk_content_cooking_method_content_id` (`content_id`),
  CONSTRAINT `fk_content_cooking_method_content_id` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_cooking_method`
--

LOCK TABLES `content_cooking_method` WRITE;
/*!40000 ALTER TABLE `content_cooking_method` DISABLE KEYS */;
INSERT INTO `content_cooking_method` VALUES (1,1,'ใส่ขนมปังป่น ผงอัลมอนด์ และน้ำตาลในเครื่องปั่น Food Processor ปั่นให้เข้ากัน'),(2,1,'ค่อยๆ เทเนยละลายใส่ ปั่นต่อจนเข้ากัน'),(3,1,'เทใส่พิมพ์ กดให้แน่นและมิดขอบพิมพ์ นำเข้าเตาอบที่อุณหภูมิ 175 องศาเซลเซียสนาน 15 นาที ยกออกจากเตา พักไว้บนตะแกรงจนเย็น'),(4,1,'ตีชีสริคอตตาและมูสเข้าด้วยกันจนฟู ใส่น้ำตาล ตีต่อจนเนื้อเบาเนียน'),(5,1,'ใส่ผิวเลมอน น้ำเลมอน และไข่ทีละฟอง ตีจนส่วนผสมเข้ากันดี'),(6,1,'เทใส่ฐานพายที่พักไว้จนเย็นแล้ว ยกเข้าเตาอบที่อุณหภูมิ 160 องศาเซลเซียสนาน 70-80 นาที'),(7,1,'ยกออกจากเตา พักไว้บนตะแกรงจนเย็น จากนั้นนำมาแช่ตู้เย็นไว้อย่างน้อย 6 ชั่วโมงจึงตัดเป็นชิ้น'),(8,2,'นำแป้งข้าวเหนียวใส่ลงในภาชนะสำหรับผสม ถ้าทำประมาณ 8-10 ถ้วย ควรใช้แป้งประมาณ 500 กรัม ไม่ควรผสมหมดทั้ง 500 กรัม ควรเหลือแป้งไว้นิดหน่อย เผื่อเวลาผสมแป้งเหลวเกินไปจะได้เติมแป้งส่วนที่เหลือ นำแป้งนวดกับน้ำเปล่า นวดจนแป้งจับตัวเป็นก้อน แล้วแบ่งออกเป้นส่วนๆ เพื่อนำไปผสมเข้ากับสีผสมอาหาร'),(9,2,'จากนั้นปั้นแป้งเป็นเม็ดกลมเล็ก นำไปต้มจนแป้งสุกและลอยขึ้นมา ตักขึ้นมาใส่ชามที่มีน้ำพักไว้'),(10,2,'นำหัวกะทิใส่หม้อ และเติมน้ำเปล่าลงไปนิดหน่อย โดยอัตราส่วนประมาณ กะทิ 3 ส่วน น้ำเปล่า 1 ส่วน ตั้งไฟอ่อน เติมน้ำตาลปึกลงไป เคี่ยวด้วยไฟอ่อน ต้องมั่นคนเพราะอาจจะทำให้กะทิไหม้ได้ แล้วใส่เกลือตามลงไปเล็กน้อย ต้มจนกะทิเดือดอ่อนๆ ทั่วทั้งหม้อ จากนั้นก็ดับไฟ'),(11,2,'เมื่อกะทิเดือดทั่วทั้งหม้อจึกตอกไข่ใส่ลงไป ต้มจนไข่สุกลอย'),(12,2,'ถึงเวลาเสิร์ฟก็ตักบัวลอยและตามด้วยน้ำกะทิราดลงไป และตักไข่ตามลง'),(13,4,'ขูดผิวเลม่อนใส่ลงไปในน้ำตาลคนผสมกับน้ำตาล'),(14,4,'ตีเนย ใส่น้ำตาล ตีจนฟูขาว'),(15,4,'ตอกไข่ทีละฟอง (2 ฟอง) ตีผสมให้เข้ากัน'),(16,4,'ร่อนแป้งลงไปครึ่งหนึ่ง แล้วคนผสม'),(17,4,'ตอกไข่ฟองที่ 3 แล้วตีผสม'),(18,4,'ใส่แป้งที่เหลือและผงฟู แล้วคนผสม'),(19,4,'เทใส่พิมพ์ที่ต้องการ และอบที่อุณหภูมิ 150 องศา ประมาณ 40 นาที'),(20,4,'ส่วนของน้ำเชื่อม นำน้ำเลม่อน 100 กรัม น้ำเปล่า และน้ำเชื่อม คนผสมให้เข้ากัน นำมาทาที่เนื้อเค้กตอนอบเสร็จ พักไว้ให้เย็น'),(21,4,'ส่วนของเกรซเลม่อน นำน้ำเลม่อน 60 กรัม และน้ำตาลไอซิ่ง คนผสมกัน และราดบนเค้กทิ้งไว้ให้เซตตัว '),(22,10,'เตรียมพิมพ์ ใช้เนยขาวทาที่พิมพ์ ตัดกระดาษไขรองพิมพ์'),(23,10,'นำแป้ง ผงโกโก้ ร่อนรวมกัน 2-3 ครั้ง'),(24,10,'นำเนยเค็มและเกลือป่นไปละลาย'),(25,10,'เมื่อละลายส่วนของเนยแล้ว ใส่น้ำตาลทราย ตีด้วยความเร็วต่ำจนละลายเข้ากันดี'),(26,10,'ค่อยๆ ใส่ไข่ไก่ทีละฟอง ตีจนเข้ากัน'),(27,10,'ตีด้วยความเร็วสูงสุด ประมาณ 10-12 นาที จนเนื้อเนียนสวย'),(28,10,'ใส่กลิ่นวานิลลา ตีด้วยความเร็วต่ำเพื่อไล่ฟองอากาศ จนเนื้อเนียนเงา'),(29,10,'ใส่แป้ง ผงโกโก้ ค่อยๆ ผสมจนเข้ากันดี'),(30,10,'เทลงพิมพ์ ใช้ไม้พายเกลี่ยให้เท่ากัน และเคาะพิมพ์ไล่ฟองอากาศ'),(31,10,'อบที่อุณหภูมิ 180 องศา ประมาณ 25-30 นาที'),(43,14,'นำกล้วยทั้งเปลือกไปนึ่งในน้ำเดือด ประมาณ 3 - 5 นาที แล้วปิดไฟ'),(44,14,'ปอกเปลือกและหั่นกล้วยเป็นชิ้นเล็ก ๆ'),(45,14,'ตั้งหม้อไฟกลาง ใส่หางกะทิและใบเตยลงไป ต้มจนเดือด'),(46,14,'ใส่น้ำตาลปี๊บ น้ำตาลทรายขาว และเกลือลงไป คนให้ละลาย'),(47,14,'ใส่กล้วยที่หั่นไว้ลงไป ต้มให้เดือดอีกครั้ง'),(48,14,'ใส่หัวกะทิลงไป และปล่อยทิ้งไว้ให้เดือดอีกประมาณ 3 นาที'),(49,14,'ตักใส่ชามและพร้อมเสิร์ฟ'),(109,20,'อบที่อุณหภูมิ 180 องศา ประมาณ 25-30 นาที ลองง'),(110,20,'abc ลอง'),(135,18,'test edit 2'),(136,18,'test edit 2'),(137,18,'test edit 2'),(138,18,'test edit 2'),(139,18,'test edit 2'),(140,18,'water3'),(141,19,'milk5'),(142,19,'milk 200 g.'),(143,19,'apple'),(144,19,'water'),(145,19,'อบที่อุณหภูมิ 180 องศา ประมาณ 25-30 นาที'),(146,25,'as'),(147,25,'as'),(148,26,'milk'),(149,26,'fdg'),(162,33,'water'),(163,33,'อบที่อุณหภูมิ 180 องศา ประมาณ 25-30 นาที'),(164,25,'water'),(165,25,'อบที่อุณหภูมิ 180 องศา ประมาณ 25-30 นาที'),(166,25,'test1011');
/*!40000 ALTER TABLE `content_cooking_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_image`
--

DROP TABLE IF EXISTS `content_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_image` (
  `image_no` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`image_no`,`content_id`),
  KEY `fk_content_image_content_idx` (`content_id`),
  CONSTRAINT `fk_content_image_content_id` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_image`
--

LOCK TABLES `content_image` WRITE;
/*!40000 ALTER TABLE `content_image` DISABLE KEYS */;
INSERT INTO `content_image` VALUES (8,14,'\\uploads\\moreImages-1651491574911.webp'),(9,14,'\\uploads\\moreImages-1651491574915.webp'),(10,14,'\\uploads\\moreImages-1651491574916.webp'),(11,14,'\\uploads\\moreImages-1651491574918.webp'),(25,20,'\\uploads\\moreImages-1651574419957.webp'),(26,20,'\\uploads\\newImage-1651657020420.webp'),(27,20,'\\uploads\\newImage-1651657020435.webp'),(28,19,'\\uploads\\moreImages-1651567529625.webp'),(29,19,'\\uploads\\moreImages-1651567529637.jpg'),(30,19,'\\uploads\\newImage-1651664225626.jpg'),(31,19,'\\uploads\\newImage-1651664225629.jpg'),(32,19,'\\uploads\\newImage-1651664225656.webp'),(34,26,'\\uploads\\moreImages-1651740494335.jpg'),(35,33,'\\uploads\\moreImages-1651776369116.jpg'),(36,25,'\\uploads\\moreImages-1651776369116.jpg'),(37,25,'\\uploads\\newImage-1651776595608.jpg');
/*!40000 ALTER TABLE `content_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_ingredient`
--

DROP TABLE IF EXISTS `content_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_ingredient` (
  `ingredient_no` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ingredient_no`,`content_id`),
  KEY `fk_content_ingredient_content_id_idx` (`content_id`),
  CONSTRAINT `fk_content_ingredient_content_id` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_ingredient`
--

LOCK TABLES `content_ingredient` WRITE;
/*!40000 ALTER TABLE `content_ingredient` DISABLE KEYS */;
INSERT INTO `content_ingredient` VALUES (1,1,'ขนมปังบุหรี่ป่น 1 ถ้วย'),(2,1,'น้ำตาลทราย 60 กรัม'),(3,1,'ผงอัลมอนด์ 60 กรัม'),(4,1,'เนยละลาย 60 กรัม'),(5,1,'อุปกรณ์ พิมพ์ Spring Form 9 นิ้ว ทาเนย กรุด้วยกระดาษไข'),(6,1,'ชีสริคอตตา 450 กรัม'),(7,1,'มูส 450 กรัม'),(8,1,'น้ำตาลทราย 250 กรัม'),(9,1,'ผิวเลมอน 3 ช้อนโต๊ะ'),(10,1,'น้ำเลมอน 4 ช้อนโต๊ะ'),(11,1,'ไข่ไก่เบอร์ 0 3 ฟอง'),(12,2,'แป้งข้าวเหนียว 500 กรัม'),(13,2,'น้ำตาลปึก 1 ถ้วย'),(14,2,'หัวกะทิ 5 ถ้วย'),(15,2,'เกลือป่น 1 ช้อนชา'),(16,2,'ไข่ไก่'),(17,4,'เนยสดเค็ม 170 กรัม'),(18,4,'น้ำตาลทราย 150 กรัม'),(19,4,'ไข่ไก่ 3 ฟอง'),(20,4,'แป้งสาลีอเนกประสงค์ 170 กรัม'),(21,4,'ผงฟู 1 ช้อนชา'),(22,4,'ผิวเลม่อน 1-2 ลูก'),(23,4,'น้ำเลม่อน 100 กรัม'),(24,4,'น้ำเปล่า 100 กรัม'),(25,4,'น้ำเชื่อม 80 กรัม'),(26,4,'น้ำเลม่อน 60 กรัม'),(27,4,'น้ำตาลไอซิ่ง 280 กรัม'),(31,10,'เนยสดรสเค็ม 150 g.'),(32,10,'เกลือป่น 1/4 teaspoon'),(33,10,'น้ำตาลทราย 200 g.'),(34,10,'กลิ่นวานิลลา 1 teaspoon'),(35,10,'ไข่ไก่ 2 ฟอง'),(36,10,'แป้งสาลีอเนกปรงสงค์ 75 g.'),(37,10,'ผงโกโก้ 60 g.'),(51,14,'กล้วยน้ำว้า 8 ลูก (เลือกห่าม ๆ ไม่สุกมาก)'),(52,14,'หัวกะทิ 225 มิลลิลิตร'),(53,14,'หางกะทิ 300 มิลลิลิตร'),(54,14,'ใบเตย 2 ใบ'),(55,14,'น้ำตาลปี๊บ 30 กรัม'),(56,14,'น้ำตาลทรายขาว 20 กรัม'),(57,14,'เกลือ ¼ ช้อนชา'),(58,14,'แป้งมัน 1 ช้อนชา'),(92,20,'milk ลอง'),(93,20,'abc ลอง'),(106,18,'apple'),(107,18,'apple'),(108,18,'milk'),(110,19,'abc'),(111,19,'apple'),(112,25,'apple'),(113,25,'apple'),(114,26,'abc'),(115,26,'apple'),(129,33,'milk 200 g.'),(130,33,'apple'),(131,33,'lemon'),(132,25,'apple'),(133,25,'lemon'),(134,25,'test789');
/*!40000 ALTER TABLE `content_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `img` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `num_view` int DEFAULT '0',
  `num_like` int DEFAULT '0',
  `user_id` int NOT NULL,
  `post_type_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_post_user_idx` (`user_id`),
  KEY `fk_post_post_type_idx` (`post_type_id`),
  CONSTRAINT `fk_post_post_type_id` FOREIGN KEY (`post_type_id`) REFERENCES `post_type` (`post_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Cheesecake','2022-04-07 23:17:24','/uploads/cheesecake.jpg','ชีสเค้กสูตรพิเศษ หวาน นุ่ม ละมุนลิ้น ถูกใจแน่นอน',9,2,4,1),(2,'Bua loy','2022-04-08 23:12:59','/uploads/bualoy.jpg','บัวลอยไข่หวานนนนนนนนนนนน',9,8,4,2),(4,'Lemon Cake','2022-04-09 01:09:55','\\uploads\\mainImage-1649441394688.jpg','เลม่อนเค้ก หอม หวานอมเปรี้ยว ทานแล้วสดชื่นนนนน',6,10,1,1),(14,'บราวนี่โกโก้','2022-05-01 17:59:38','\\uploads\\mainImage-1651402777586.jpg','บราวนี่เนื้อหนึบ หน้าฟิล์มสวยๆ หอม อร่อย รสชาติเข้มข้น น่าทานนนน',2,1,1,1),(19,'กล้วยบวชชี','2022-05-02 18:39:35','\\uploads\\moreImages-1651491574909.webp','หอม หวาน มัน อร่อย เมนูขนมไทยที่ทำง่ายมาก ๆ',5,4,1,2),(23,'test','2022-05-03 15:25:35','\\uploads\\moreImages-1651566335264.jpg','jaaaaaaaaaaaaaaaaaaaaaaa',1,3,5,1),(24,'dfsf','2022-05-03 15:45:29','\\uploads\\moreImages-1651567529578.webp','dfsd',6,5,1,1),(25,'ทดลองงง','2022-05-03 17:40:19','\\uploads\\moreImages-1651574419954.jpg','ลองง',2,3,1,1),(30,'test 123','2022-05-06 01:46:09','\\uploads\\moreImages-1651776369107.jpg','test jaaa 456',2,1,7,1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_type`
--

DROP TABLE IF EXISTS `post_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_type` (
  `post_type_id` int NOT NULL AUTO_INCREMENT,
  `name` enum('bakery','thaidessert') DEFAULT NULL,
  PRIMARY KEY (`post_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_type`
--

LOCK TABLES `post_type` WRITE;
/*!40000 ALTER TABLE `post_type` DISABLE KEYS */;
INSERT INTO `post_type` VALUES (1,'bakery'),(2,'thaidessert');
/*!40000 ALTER TABLE `post_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_title` varchar(255) DEFAULT NULL,
  `report_text` varchar(255) DEFAULT NULL,
  `status` enum('complete','pending') DEFAULT NULL,
  `user_id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `fk_report_user_idx` (`user_id`),
  KEY `fk_report_post_id_idx` (`post_id`),
  KEY `fk_report_comment_id_idx` (`comment_id`),
  CONSTRAINT `fk_report_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `fk_report_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `fk_report_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'โพสต์ไม่เหมาะสม','โพสต์ไม่เกี่ยวกับสูตรขนม','complete',2,23,NULL),(2,'ความคิดเห็นไม่เหมาะสม','ความคิดเห็นมีคำหยาบ','pending',4,NULL,7),(5,'โพสต์ไม่เหมาะสม','มีคำหยาบคาย','complete',6,24,NULL),(6,'ความคิดเห็นไม่เหมาะสม','ความคิดเห็นไม่เคารพผู้อื่น','pending',4,NULL,7);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_UN` (`token`),
  KEY `token_FK` (`user_id`),
  CONSTRAINT `token_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,3,'5n@3T5Bbc*x0w^kB!v!SaybkRWvg6W0O8L1l4n0KbCKN/N1TxxVLkPbFQMpVHI/1gZ5dFxnxe5JkU!0@Dh=sJvX8x99-0p5Bi^M9'),(3,4,'D=xuSC0!U6Zm!HZwdMMzGDmetXXAyE/Xu223L1KuP#^8KyupFmS8gCgY$L&#4$nxt3UtkjK@IOO#jTakv1R*bb5X#gf$o2AeWYOW'),(4,5,'sUoeFCC6KDzq*3MXYtrp=95/TpURiEkL!X-2X*71CbboTJ3bXMuYfzb*8=//CpCM#0F3g^icwVSrluFzjMk-yw4B1o!4BJ2bQ0hy'),(5,7,'zHq4=Oj5!u5!KFHqKmlX0lSa09QRRWC$BtkoZXNv-xT2EOqaFR2=RWJKx8ti1xklH^ubWVQwcUo^dUQklyRP1dlMhz*4PCp4#GvN');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `user_img` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Orange',NULL,'orange145','Porange86',NULL,'normal'),(2,'Momo',NULL,'momome55','Hmode187',NULL,'normal'),(3,'ชนิสรา',NULL,'nestnest','$2b$05$8oxXHFl3Kbs06nvab9O2p.9vtePh.m6ZxO5R3n1RMpA/ZKVcmkRhG','nestnest61@gmail.com','admin'),(4,'น้ำ',NULL,'nest1','$2b$05$iZvno8G18BRILcbTzXpeBeXoSUnL/yW9I.S41O.XEe/urDk3kiaAe','77777@hotmail.com','normal'),(5,'เจน',NULL,'jen12','$2b$05$OxuoFBNyred4VGqBKDmhueRMWlBYQLbrzQmXzQ4YcwI5RI4JQ0hKy','jen123@gmail.com','admin'),(6,'nest1234',NULL,'nest2','$2b$05$ejackwoQLjumADfhvWujh.rMvwFp/Z1kuC/h2AVhA5g94XxmozPMO','nest2@hotmail.com','normal'),(7,'Kotchakorn Kajonchai','\\uploads\\image-1651784389015.jpeg','nejjen','$2b$05$/AUEGHyEHElxEEkWZwxwCOT9vMneG7An7PQfVkOZT/kGF.eQ5Lrl2','nejjen18@gmail.com','normal');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-06  4:10:25
