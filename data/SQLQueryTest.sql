﻿use Warehouse
go

DECLARE @input1 NVARCHAR(MAX)
DECLARE @input2 NVARCHAR(MAX)
DECLARE @input3 NVARCHAR(MAX)

SET @input1 = 'nv'
SET @input2 = N'Nguyễn'
SET @input3 = N'hải'

select * from Personnel_Info
where 
(
	(@input1 is NULL or LEN(@input1) = 0) OR (Code LIKE N'%' + @input1 + N'%')
)
and
(
	(@input2 IS NULL OR LEN(@input2) = 0) OR (Name LIKE N'%' + @input2 + N'%')
)
and
(
	(@input3 IS NULL OR LEN(@input3) = 0) OR (Address LIKE N'%' + @input3 + N'%')
)


alter table Warehouse_Info ADD CompanyId int not null

alter table	Personnel_Info ADD CompanyId int not null

alter table Personnel_Info ADD WarehouseName nvarchar(255)

SELECT COUNT(*) AS total_rows FROM Personnel_Info;