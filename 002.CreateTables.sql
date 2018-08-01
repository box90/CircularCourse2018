use DB_SiWeb3

IF OBJECT_ID('dbo.RESOURCE', 'U') IS NOT NULL 
	drop table [dbo].[RESOURCE]
create table [RESOURCE]
(
	ID				int primary key,
	UserName		varchar(8),
	[Name]			varchar(20) not null,
	[Surname]		varchar(20) not null unique,
	IsAvaiable		bit default 1,
	IsCP			bit default 0
)
	

IF OBJECT_ID('dbo.COURSE', 'U') IS NOT NULL 
	drop table [dbo].[COURSE]
create table [COURSE]
(
	ID				int identity(1,1) primary key,
	Title			varchar(20) not null,
	Description		varchar(MAX),
	RefYear			int default year(getdate()),
	StartDate		datetime,
	EndDate			datetime,
	IsCircular		bit default 0,
	ID_Coordinator	int foreign key references [Resource](ID)
)

IF OBJECT_ID('dbo.[SUBSCRIPTION]', 'U') IS NOT NULL 
	drop table [dbo].[SUBSCRIPTION]
create table [SUBSCRIPTION]
(
	ID				int identity(1,1) primary key,
	ID_Resource		int	not null foreign key references [Resource](ID),
	ID_Course		int not null foreign key references [Course](ID),
	ID_CP			int not null foreign key references [Resource](ID),
	StartDate		datetime not null,
	MaxEndDate		as DATEADD(month,18,StartDate),
	IsAdmitted		bit default 0,
	Notes			varchar(max),
)

