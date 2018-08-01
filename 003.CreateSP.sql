-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
alter PROCEDURE SetUserName
	-- Add the parameters for the stored procedure here
	@name varchar(20),
	@surname varchar (20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	-- Declare the return variable here
	DECLARE @res varchar(8)
	declare @checkNick varchar(8)
	declare @tmpConcat varchar(8)
	Declare @check int
	DECLARE @num int
	declare @numberOfMissingCharacter int

	--check len of concatenation
	if(len(concat(Replace(@surname,' ',''),Replace(@name,' ', ''))) < 7)
	begin
		set @tmpConcat = concat(Replace(@surname,' ',''),Replace(@name,' ', ''))
		set @numberOfMissingCharacter = 8 - len(@tmpConcat)
		--fill missin character on userName
		while(@numberOfMissingCharacter > 1)
		begin
			set @tmpConcat = CONCAT(@tmpConcat,'0')
			set @numberOfMissingCharacter = @numberOfMissingCharacter -1 
		end
		--Creation of last character
		set @num = 1
		set @tmpConcat = CONCAT(@tmpConcat,CAST(@num as varchar(1)))
		set @check = (select ID from DB_SiWeb3.dbo.RESOURCE r where r.UserName = @tmpConcat)
		
		while(@check is not null)
		begin
			set @tmpConcat = REPLACE(@tmpConcat,CAST(@num as varchar(1)),CAST((@num+1) as varchar(1)))
			set @num = @num +1
			set @check = (select ID from DB_SiWeb3.dbo.RESOURCE r where r.UserName = @tmpConcat)
		end

		select @tmpConcat as Result

	end

	else
	begin
		--otherwise set normal userName
		set @num = 1
		set @checkNick = lower(concat(substring(Replace(@surname,' ',''),0,6),substring(Replace(@name,' ', ''),0,3),CAST(@num as varchar(1))))

		set @check = (select ID from DB_SiWeb3.dbo.RESOURCE r where r.UserName = @checkNick)
		
		while(@check is not null)
		begin
			set @num = @num +1
			set @checkNick = lower(concat(substring(Replace(@surname,' ',''),0,6),substring(Replace(@name,' ', ''),0,3),CAST(@num as varchar(1))))
			set @check = (select ID from DB_SiWeb3.dbo.RESOURCE r where r.UserName = @checkNick)
		end
			
		set @res = lower(concat(substring(Replace(@surname,' ',''),0,6),substring(Replace(@name,' ', ''),0,3),CAST(@num as varchar(1))))

		select @res as Result
	end
END
GO
