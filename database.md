*Database Design Notes*

Customer:
ID - PK
FirstName
LastName
Email
TokenID

Products:
ID
Name
Price
Type

Type Table:
ID
Type Name
Description

Order:
ID
ProductID
CustomerID

Token:
TokenID
CustomerID
token