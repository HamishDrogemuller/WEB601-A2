*Database Design Notes*

Customer:
CustomerID - PK - VAR30
FirstName - VAR30
LastName - VAR30
Email - VAR30
TokenID - VAR30

Product:
ProductID - PK - VAR30
Name - VAR30
Price - INT
TypeID - VAR30

Type Table:
TypeID - PK - VAR30
Type Name - VAR30
Description - VAR50

Order:
OrderID - PK - VAR30
ProductID - FK
CustomerID - FK

Token:
TokenID - PK - VAR30
CustomerID - FK
Token - VAR30