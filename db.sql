-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema movieRental
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema movieRental
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `movieRental` DEFAULT CHARACTER SET utf8 ;
USE `movieRental` ;

-- -----------------------------------------------------
-- Table `movieRental`.`movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movieRental`.`movie` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `director` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `movieRental`.`media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movieRental`.`media` (
  `code` INT(11) NOT NULL,
  `movie_id` INT(11) NOT NULL,
  PRIMARY KEY (`code`, `movie_id`),
  INDEX `fk_media_movie_idx` (`movie_id` ASC),
  CONSTRAINT `fk_media_movie`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movieRental`.`movie` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `movieRental`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movieRental`.`user` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `movieRental`.`rent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movieRental`.`rent` (
  `user_id` INT(11) NOT NULL,
  `media_code` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `media_code`),
  INDEX `fk_user_has_media_media1_idx` (`media_code` ASC),
  INDEX `fk_user_has_media_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_media_media1`
    FOREIGN KEY (`media_code`)
    REFERENCES `movieRental`.`media` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_media_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `movieRental`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `movieRental`.`movie`
-- -----------------------------------------------------
START TRANSACTION;
USE `movieRental`;
INSERT INTO `movieRental`.`movie` (`id`, `title`, `director`) VALUES (1, 'Into The Wild', 'Sean Penn');
INSERT INTO `movieRental`.`movie` (`id`, `title`, `director`) VALUES (2, 'The Pursuit Of Happyness', 'Gabriele Muccino');
INSERT INTO `movieRental`.`movie` (`id`, `title`, `director`) VALUES (3, 'The Shawshank Redemption', 'Frank Darabont');

COMMIT;


-- -----------------------------------------------------
-- Data for table `movieRental`.`media`
-- -----------------------------------------------------
START TRANSACTION;
USE `movieRental`;
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0001, 1);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0002, 1);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0003, 1);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0004, 1);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0005, 1);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0006, 2);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0007, 2);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0008, 2);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0009, 2);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0010, 2);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0011, 3);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0012, 3);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0013, 3);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0014, 3);
INSERT INTO `movieRental`.`media` (`code`, `movie_id`) VALUES (0015, 3);

COMMIT;
