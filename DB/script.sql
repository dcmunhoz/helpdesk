CREATE USER 'desk'@'localhost' IDENTIFIED BY 'desk';
CREATE USER 'desk'@'%' IDENTIFIED BY 'desk';
CREATE USER 'desk'@'127.0.0.1' IDENTIFIED BY 'desk';

CREATE DATABASE db_idesk DEFAULT CHARSET 'UTF8' DEFAULT COLLATE 'utf8_general_ci';
USE db_idesk;

GRANT ALL PRIVILEGES ON db_idesk.* TO 'desk'@'localhost';
GRANT ALL PRIVILEGES ON db_idesk.* TO 'desk'@'127.0.0.1';
GRANT ALL PRIVILEGES ON db_idesk.* TO 'desk'@'%';


CREATE TABLE tb_users(
	id_user 	 	INT NOT NULL AUTO_INCREMENT,	# Id do usuário.
    username 	VARCHAR(16) NOT NULL UNIQUE,		# Usuário.
    passw	 	VARCHAR(255) NOT NULL,				# Senha.
    email		VARCHAR(255) NOT NULL,				# E-mail.
    active 		BOOL NOT NULL DEFAULT TRUE,			# Ativo ou inativo.
    id_profile 	INT NOT NULL,						# Id do perfil de acesso.
    CONSTRAINT pk_user PRIMARY KEY (id_user)
) DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_profiles(
	id_profile 				INT NOT NULL AUTO_INCREMENT, # Id do perfil. 
    profile_name 			VARCHAR(30) NOT NULL,		 # Nome do perfil.
    profile_description		VARCHAR(100),				 # Descrição do perfil.
    administrator			BOOL NOT NULL DEFAULT TRUE,	 # Perfil com direitos administrativos.
    CONSTRAINT pk_profile PRIMARY KEY (id_profile)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_users ADD CONSTRAINT fk_profiles_users FOREIGN KEY (id_profile) REFERENCES tb_profiles(id_profile);

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Administrador', 'Perfil de administração do sistema.', true);

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Padrão', 'Perfil padrão de usuário', false);

INSERT INTO tb_users(username, passw, email, active, id_profile)
VALUES('admin', md5('admin'), 'admin@admin.com', true, (SELECT id_profile FROM tb_profiles WHERE profile_name = 'Administrador' ));

CREATE TABLE tb_persons(
	id_person 		INT NOT NULL AUTO_INCREMENT, 	# Id da pessoa. 
    full_name 		VARCHAR(100) NOT NULL,			# Nome completo.
    dt_creation 	DATETIME DEFAULT NOW(),			# Data de criação.
    dt_alteration 	DATETIME, 						# Data de alteração.
    id_user			INT NOT NULL UNIQUE, 			# Id do usuário referente a esta pessoa.
    id_company		INT,							# Id da empresa.
    id_place		INT,							# Id do local de atuação.
    id_sector	 	INT,							# Id do setor de atuação.
    need_updates	BOOl DEFAULT TRUE,				# Precisa atualizar o cadastro.
    CONSTRAINT pk_person PRIMARY KEY (id_person)
) DEFAULT CHARACTER SET 'UTF8';

INSERT INTO tb_persons(full_name, id_user, id_company, id_place, id_sector, need_updates) VALUES("iDesk Admin", 1, 1, 1, 1, 0);

CREATE TABLE tb_cities(
	id_city		INT NOT NULL AUTO_INCREMENT,	# Id da cidade.
    city_name   VARCHAR(200) NOT NULL UNIQUE,	# Nome da cidade.
	CONSTRAINT pk_city PRIMARY KEY (id_city)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_cities (city_name) values('Default_city');

CREATE TABLE tb_companies(
	id_company INT NOT NULL AUTO_INCREMENT,		# Id da empresa.
    company_name VARCHAR(100) NOT NULL UNIQUE,	# Nome da empresa.
    CONSTRAINT pk_company PRIMARY KEY (id_company)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_companies(company_name) values("Default Companie");

CREATE TABLE tb_places(
	id_place INT NOT NULL AUTO_INCREMENT,		# Id do local de atuação.
    local_name VARCHAR(100) NOT NULL UNIQUE,	# Nome do local de atuação.
    id_company INT NOT NULL,					# Id da compania que este local pertence.
    id_city INT NOT NULL,						# Id da cidade que este local esta situado.
    CONSTRAINT pk_place PRIMARY KEY (id_place)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_places(local_name, id_company, id_city) values('Default Local', 1, 1);

CREATE TABLE tb_sectors(
	id_sector INT NOT NULL AUTO_INCREMENT,		# Id do setor.
    sector_name VARCHAR(100) NOT NULL UNIQUE,	# Nome do setor.
    id_company INT NOT NULL,					# Id da compania que este setor pertence.
    CONSTRAINT pk_sector PRIMARY KEY (id_sector)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_sectors(sector_name, id_company) values('Default Sector', 1);

ALTER TABLE tb_persons ADD CONSTRAINT fk_users_persons FOREIGN KEY (id_user) REFERENCES tb_users(id_user);
ALTER TABLE tb_persons ADD CONSTRAINT fk_companies_persons FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);
ALTER TABLE tb_persons ADD CONSTRAINT fk_places_persons FOREIGN KEY (id_place) REFERENCES tb_places(id_place);
ALTER TABLE tb_persons ADD CONSTRAINT fk_sectors_persons FOREIGN KEY (id_sector) REFERENCES tb_sectors(id_sector);

ALTER TABLE tb_places ADD CONSTRAINT fk_company_places FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);
ALTER TABLE tb_places ADD CONSTRAINT fk_city_places FOREIGN KEY (id_city) REFERENCES tb_cities(id_city);
ALTER TABLE tb_sectors ADD CONSTRAINT fk_company_sectors FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);

CREATE TABLE tb_tickets(
	id_ticket INT NOT NULL AUTO_INCREMENT,		# Id do ticket
    ticket_title VARCHAR(255) NOT NULL,			# Titulo do ticket
    ticket_details TEXT NOT NULL,				# Detalhes do ticket
    id_user INT NOT NULL,						# Id do usuário que abriu o ticket
    dt_creation DATETIME DEFAULT NOW(),			# Data de criação do ticket,
    dt_updates DATETIME DEFAULT NOW(),			# Ultima atualização (mensagem/status)
    id_status INT NOT NULL,						# Status do ticket
    id_priority INT NOT NULL,					# Id da prioridade
    CONSTRAINT pk_ticket PRIMARY KEY (id_ticket)
)DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_priorities(
	id_priority 	INT NOT NULL AUTO_INCREMENT,
    priority_name   VARCHAR(24) NOT NULL,
    bg_color		VARCHAR(6) NOT NULL DEFAULT 'FFFFFF',
    font_color		VARCHAR(6) NOT NULL DEFAULT '000000',
    CONSTRAINT pk_priority PRIMARY KEY(id_priority)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_tickets ADD CONSTRAINT fk_priority_ticket FOREIGN KEY(id_priority) REFERENCES tb_priorities(id_priority);

INSERT INTO tb_priorities (priority_name) values('Neutra');
INSERT INTO tb_priorities (priority_name) values('Baixa');
INSERT INTO tb_priorities (priority_name) values('Média');
INSERT INTO tb_priorities (priority_name) values('Alta');
INSERT INTO tb_priorities (priority_name) values('Urgente');

CREATE TABLE tb_status(
	id_status  		INT NOT NULL AUTO_INCREMENT,
    status_name 	VARCHAR(100) NOT NULL,
    CONSTRAINT pk_status PRIMARY KEY(id_status)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_tickets ADD CONSTRAINT fk_status_ticket FOREIGN KEY (id_status) REFERENCES tb_status(id_status);
ALTER TABLE tb_tickets ADD CONSTRAINT fk_user_ticket FOREIGN KEY (id_user) REFERENCES tb_users(id_user);

INSERT INTO tb_status (status_name) VALUES('Aberto');
INSERT INTO tb_status (status_name) VALUES('Pendente Usuário');
INSERT INTO tb_status (status_name) VALUES('Pendente Colaborador');
INSERT INTO tb_status (status_name) VALUES('Fechado');

CREATE TABLE tb_ticket_messages(
	id_ticket_message 	INT NOT NULL AUTO_INCREMENT,
    id_ticket 	INT NOT NULL,
    id_user 	INT NOT NULL,
    message 	TEXT NOT NULL,
    dt_send		DATETIME DEFAULT NOW(),
    CONSTRAINT pk_ticket_message PRIMARY KEY(id_ticket_message)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_ticket_messages ADD CONSTRAINT fk_ticket_ticketmessage FOREIGN KEY (id_ticket) REFERENCES tb_tickets(id_ticket);
ALTER TABLE tb_ticket_messages ADD CONSTRAINT fk_user_ticketmessage FOREIGN KEY (id_user) REFERENCES tb_users(id_user);

CREATE TABLE tb_ticket_assignment(
	id_ticket_assignment INT NOT NULL AUTO_INCREMENT,
    id_ticket INT NOT NULL,
    id_user INT NOT NULL,
    dt_assignment DATETIME DEFAULT NOW(),
    CONSTRAINT pk_ticket_assignment PRIMARY KEY(id_ticket_assignment)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_ticket_assignment ADD CONSTRAINT fk_ticket_ticketassignment FOREIGN KEY(id_ticket) REFERENCES tb_tickets(id_ticket);
ALTER TABLE tb_ticket_assignment ADD CONSTRAINT fk_user_ticketassignment FOREIGN KEY(id_user) REFERENCES tb_users(id_user);

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_save_user`(
piduser INT,
pusername VARCHAR(16),
pfullname VARCHAR(100),
ppassw VARCHAR(255),
pemail VARCHAR(255),
pactive BOOL,
pidprofile INT,
pidcompany INT,
pidplace INT,
pidsector INT,
pneedup	INT
)
BEGIN

	DECLARE lastUserId INT;
	
	IF piduser >= 1 THEN
		UPDATE tb_users
        SET username = pusername,
			email = pemail,
            active = pactive,
            id_profile = pidprofile
		WHERE id_user = piduser;
        
        UPDATE tb_persons
        SET full_name = pfullname,
			id_company = pidcompany,
            id_place = pidplace,
            id_sector = pidsector,
            need_updates = pneedup
		WHERE id_user = piduser;
        
        SELECT piduser INTO lastUserId;
	ELSE
		
        INSERT INTO tb_users (username, passw, email, active, id_profile)
        VALUES (pusername, md5(ppassw), pemail, pactive, pidprofile);
        
        SELECT LAST_INSERT_ID() INTO lastUserId;
        
        INSERT INTO tb_persons (full_name, id_user, id_company, id_place, id_sector, need_updates)
        VALUES (pfullname, lastUserId, pidcompany, pidplace, pidsector, pneedup);
        
    END IF;
    
    SELECT * FROM tb_users WHERE id_user = lastUserId;
    
END$$
DELIMITER ;

DELIMITER $
CREATE PROCEDURE proc_save_ticket(
	pidticket 	INT,
    piduser  	INT,
    ptitle 		VARCHAR(255),
    pdesc  		TEXT,
    pidpriority INT
)
BEGIN
	
    DECLARE lastTicket INT;
    
	INSERT INTO tb_tickets (ticket_title, ticket_details, id_user, id_status, id_priority)
	VALUES(ptitle, pdesc, piduser, 1, pidpriority);
	
    SELECT LAST_INSERT_ID() INTO lastTicket;
    
    INSERT INTO tb_ticket_messages (id_ticket, id_user, message)
    VALUES(lastTicket, piduser, pdesc);

	SELECT * FROM tb_tickets WHERE id_ticket = lastTicket;

END $
DELIMITER ;

DELIMITER $
CREATE PROCEDURE proc_save_message(
	pid_ticket  INT,
    pid_user	INT,
    pmessage	TEXT
)
BEGIN
	
    DECLARE lastMessageId INT;
    
    INSERT INTO tb_ticket_messages (id_ticket, id_user, message) VALUES(pid_ticket, pid_user, pmessage);
    
    SELECT LAST_INSERT_ID() INTO lastMessageId;
		
    SELECT lastMessageId as id_message;    
END$
DELIMITER ;

DELIMITER $
CREATE PROCEDURE proc_save_company(
	pidcompany INT,
    pname	   TEXT
)
BEGIN
	
    DECLARE lastCompanyId INT;
        
    IF pidcompany >= 1 THEN
		
		UPDATE tb_companies
        SET company_name = pname
        WHERE id_company = pidcompany;
        
    ELSE
		
		INSERT INTO tb_companies (company_name)
        VALUES (pname);
        
        SELECT LAST_INSERT_ID() INTO lastCompanyId;
        
    END IF;
    
	SELECT * FROM tb_companies WHERE id_company = lastCompanyId;
    
END $
DELIMITER ; 