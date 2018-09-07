use DB_SiWeb3

--Remove Refuse
IF OBJECT_ID('dbo.[SUBSCRIPTION]', 'U') IS NOT NULL 
	drop table [dbo].[SUBSCRIPTION]
IF OBJECT_ID('dbo.[TEACHING]', 'U') IS NOT NULL 
	drop table [dbo].[TEACHING]
IF OBJECT_ID('dbo.COURSE', 'U') IS NOT NULL 
	drop table [dbo].[COURSE]
IF OBJECT_ID('dbo.RESOURCE', 'U') IS NOT NULL 
	drop table [dbo].[RESOURCE]

--Creations
create table [RESOURCE]
(
	ID				int primary key,
	UserName		varchar(8),
	[Name]			varchar(20) not null,
	[Surname]		varchar(20) not null,
	IsAvaiable		bit default 1,
	IsCP			bit default 0,
	IsTeacher		bit default 0
)
	
create table [COURSE]
(
	ID				int identity(1,1) primary key,
	Title			varchar(20) not null,
	Description		varchar(MAX),
	RefYear			int default year(getdate()),
	StartDate		datetime,
	EndDate			datetime,
	IsCircular		bit default 0,
	ID_Coordinator	int foreign key references [Resource](ID) on delete set null
)

create table [SUBSCRIPTION]
(
	ID				int identity(1,1) primary key,
	ID_Resource		int	not null foreign key references [Resource](ID) on delete cascade,
	ID_Course		int not null foreign key references [Course](ID) on delete cascade,
	ID_CP			int not null foreign key references [Resource](ID) on delete no action,
	StartDate		datetime not null,
	MaxEndDate		as DATEADD(month,18,StartDate),
	IsAdmitted		bit default 0,
	Notes			varchar(max),
)

create table [TEACHING]
(
	ID				int identity(1,1) primary key,
	ID_Resource		int	not null foreign key references [Resource](ID) on delete cascade,
	ID_Course		int not null foreign key references [Course](ID) on delete cascade,
	Notes			varchar(max)
)