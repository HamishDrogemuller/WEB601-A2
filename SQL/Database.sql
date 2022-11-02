-- Drop Database for clean start
Drop Database If Exists WEB601;
Create Database WEB601;
Use WEB601;

-- Drop Generate Procedure
Drop Procedure If Exists Generate;
Delimiter //
-- Create Procedure
Create Procedure Generate()
Begin

	-- Drop Tables
	Drop Table If Exists tblCustomer;
    Drop Table If Exists tblToken;
    Drop Table If Exists tblSession;
    Drop Table If Exists tblCartItem;
    Drop Table If Exists tblStatus;
    Drop Table If Exists tblOrder;
    Drop Table If Exists tblOrderItems;
    Drop Table If Exists tblProduct;
    Drop Table If Exists tblProductTypes;
    
    -- Drop User
    Drop User If Exists 'Strix'@'Localhost';
    
    -- Create User
    Create User 'Strix'@'localhost' Identified By 'Corvere300';
	Grant All On WEB601.* To 'Strix'@'localhost';
    
    -- Create tblCustomer
    Create Table tblCustomer(
		CustomerID Int Not Null Primary Key,
        FirstName Varchar(50) Not Null,
        LastName Varchar(50) Not Null,
        Email Varchar(50) Unique Not Null,
        `Password` Varchar(50) Not Null,
        `Admin` Bool Default False Not Null
        );
        
	Create Table tblToken(
		TokenID Int Not Null Primary Key,
        CustomerID Int Not Null,
        Token Varchar(255),
        Foreign Key (CustomerID) References tblCustomer(CustomerID)
        );
        
	Create Table tblShoppingSession(
		SessionID Int Not Null Primary Key,
        CustomerID Int Not Null,
        Total Int,
        CreatedAt Timestamp,
        ModifiedAt Timestamp,
        Foreign Key (CustomerID) References tblCustomer(CustomerID)
        );
        
	Create Table tblCartItem(
		CartItemID Int Not Null Primary Key,
        SessionID Int,
        ProductID Int,
        Quantity Int,
        Created_At Timestamp,
        Modified_At Timestamp
        );
        
	Create Table tblStatus(
		StatusID Int Not Null Primary Key,
        StatusDescription Varchar(255)
        );
	
    Create Table tblOrder(
		OrderID Int Not Null Primary Key,
        CustomerID Int,
        StatusID Int,
        Total Int,
        Created_At Timestamp,
        Modified_At timestamp
        );
        
	Create Table tblOrderItems(
		OrderItemsID Int Not Null Primary Key,
        OrderID Int,
        ProductID Int,
        Created_At Timestamp,
        Modified_At timestamp
        );
        
	Create Table tblProduct(
		ProductID Int Not Null Primary Key,
        ProductName Varchar(255),
        Price Int,
        TypeID int
        );
        
	Create Table tblType(
		TypeID Int Not Null Primary Key,
        TypeName Varchar(255),
        TypeDescription Varchar(255)
        );
        
	-- Apply remaining Foreign Key Constraints
    
    Alter Table tblCartItem 
    Add Constraint SessionID
    Foreign Key (SessionID) References tblShoppingSession(SessionID);
    
	Alter Table tblCartItem 
    Add Constraint ProductID
    Foreign Key (ProductID) References tblProduct(ProductID);
    
	Alter Table tblOrder
    Add Constraint CustomerID
    Foreign Key (CustomerID) References tblCustomer(CustomerID);
    
    Alter Table tblOrder
    Add Constraint StatusID
    Foreign Key (StatusID) References tblStatus(StatusID);
    
    Alter Table tblOrderItems
    Add Constraint OrderID
    Foreign Key (OrderID) References tblOrder(OrderID);
    
    Alter Table tblProduct
    Add Constraint TypeID
    Foreign Key (TypeID) References tblType(TypeID);
    
End //

Delimiter ;

Call Generate();
