# certificate-verification


Instruction Manual for Certificate Verification System

Overview
This guide will help you set up and run a Certificate Verification System using XAMPP, MySQL, Node.js, and Express.js. The system allows users to verify the authenticity of certificates through a web interface. This applies for only Windows OS.

Step-by-Step Setup Instructions

1. Install and Configure XAMPP

Download XAMPP:

**   - Go to XAMPP's website and download the Windows version.**


Install XAMPP: 

Run the XAMPP installer and follow the prompts.
Choose the components you want to install. Make sure to select Apache, MySQL, and PHP.

Start XAMPP:

Open the XAMPP Control Panel from the Start menu or desktop shortcut.

Start Apache and MySQL by clicking the "Start" buttons next to them.

2. Set Up the MySQL Database

Open phpMyAdmin. Click on the Admin

Open your web browser and navigate to http://localhost/phpmyadmin.

Create a New Database:

Click on the Databases tab in phpMyAdmin.
Enter a name for your new database (e.g., certificates_db) and click Create.

Create the certificates Table:

Select the newly created database from the list on the left.
Go to the SQL tab, paste the SQL code to create the certificates table, and click Go.

     CREATE TABLE certificates (
         id INT AUTO_INCREMENT PRIMARY KEY,
         intern_name VARCHAR(100),
         certificate_code VARCHAR(50) UNIQUE,
         issue_date DATE,
         is_valid BOOLEAN DEFAULT TRUE
);
     
Insert Sample Data (Optional):

Use the SQL tab to insert sample data for testing purposes.


     INSERT INTO certificates (intern_name, certificate_code, issue_date, is_valid)
     VALUES ('John Doe', 'ABC123', '2024-08-30', TRUE);
     
3. Set Up Your Node.js Environment

Make sure you have Node.js installed on your machine.

Open VS Code:

Open VS Code and navigate to your project folder by Choosing "Open Folder" from the File option at the top left and open htdocs.

Initialize Your Node.js Project:
Open the Terminal by clicking the "Terminal" Tab and choosing "New Terminal"

Once in the Terminal on the botton, run :
    
    npm init -y 

to initialize a new Node.js project.

Install the required packages:
     
     npm install express mysql2 body-parser

4. Important NOTE: Adjust port number

Open the index.js file

Under this specific code segment:

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'certificate_db'
});

The port number 3306 applies to my specific mysql server running on my Windows machine using XAMPP control panel. This can differ for your system, depending on your setup of MySql. Kindly find out the port number of your specific mysql server on your PC and change the number accordingly.

5. Run Your Express.js Server

To start Your Express.js Server:

Open VS Code and navigate to your project folder. Open the Terminal. Run the following code:

    node index.js.

Open the Web Interface: 

Open your web browser and navigate to:

http://localhost:3000/ 

to access the front end page.

Test the System:

Enter a certificate code in the provided field and click Verify.
Check the displayed result to see if the certificate is valid or not.
