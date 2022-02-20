# About project

**NOSQL-JSON-DB** is a _nosql_ Nodejs module created for the purpose of storing data in a json file _asynchronously_ without connecting to a database and also with a little similar syntax and effect as Mysql / Mongodb

Using this module, you can Create , Read , Update and Delete tables just like in Mysql / Mongodb

You can perform **CRUD** tasks asynchronously using this module

<br>

# Installation

To use this module you should already have **Nodejs** installed on your device and you should also have knowledge of Nodejs

See [Nodejs installation](https://google.com/search?q=how+to+install+Nodejs) for details on how to install Nodejs

See [Nodejs tutorial](https://google.com/search?q=Nodejs+tutorial) to learn Nodejs

<br>

### Next

Run this command on your command line or terminal
```command
    npm install nosql-json-db
```

<br>

# Usage

First , create an empty JSON file which would be used as the database

Use the Nodejs **require()** function to import **nosql-json-db** into your code

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

```

To access the methods and functions of **Nosqljsondb** you have to create an instance of **Nosqljsondb**

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

```

<br>

In the example above , the **Nosqljsondb()** object takes a string value which points to the path to an empty JSON file to be used as a database for storing data

<br>

# Exploring features

As said earlier , you can perform **CRUD** actions using this module

<br>

## Creating Tables

The **Nosqljsondb()** object has a method for creating tables called **createTable()**

The **createTable()** method takes two arguements

* The first is of type => string which specifies the name to be given to the table

* The second is an array of strings and in this case,  the strings represents the names of individual columns in the table to be created

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //creating a table
    //first arguement => table name , type => string
    //second arguement => array of strings representing names to be given to each columns in the table

    db.createTable("table1",["column1","column2","column3"]);
    
    //this creates table with three columns => "column1","column2" and "column3"

```

<br>

If the table already exists , an error would be thrown

We would be using this table as a reference in subsequent examples

<br>

## Inserting into tables

The **Nosqljsondb()** object has a method for creating tables called **insertInto()**

The **insertInto()** method takes two arguements

* The first is of type => string which specifies the name of the table into which the data is to be inserted

* The second is an object whose individual property represents a  column in the table and the value of every individual property represents the value to be inserted into the column which the property represents

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //inserting into the table created earlier
    //arguements => table name , object of column names and values to be inserted
    db.insertInto("table1",{
        column1 : "hi",
        column2 : "hey",
        column3 : "hello"
    });

```

<br>

#### Note
You have to specify all the columns which exists in the table else an error would occcur

Also , if you do not want to insert data into specific columns just leave the insertion value as an empty string => "".

If you do not do so when trying to skip or ommit insertion into certain columns the table might be affected badly and would loose tracking scopes.

If the table does not exist , an error would be thrown

<br>

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //here we do not want to insert any value into "column2"

    //good way
    db.insertInto("table1",{
        column1 : "hi",
        column2 : "",
        column3 : "hello"
    });

    //bad way
    db.insertInto("table1",{
        column1 : "hi",
        column3 : "hello"
    });

```

<br>

## Preview of JSON file used as database after creating table1 and insertion has been made

<br>

```json
    [
        {
            "tableName": "table1",
            "columns": {
                "column1": [
                    "hi"
                ],
                "column2": [
                    "hey"
                ],
                "column3": [
                    "hello"
                ]
            }
        }
    ]
```
<br>

## Checking if a table exists

<br>

Most times, when trying to perform **CRUD** actions on a table, if the table exists or not in the database an error would thrown depending on the type of action

To handle this , the **Nosqljsondb()** object has a method for checking for the existence of tables  called **checkTable()**

This method takes two arguements 

* The first is of type => string which specifies the name of the table whose existence is to be checked for in the database

* The second is a callback function whose parameter represents the Boolean result of the search

<br>

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //tableName , callback whose parameter is a boolean of the search result

    db.checkTable("table1" , (result) => {
    console.log(result)
    //returns true
    })

    
    db.checkTable("tab" , (result) => {
    console.log(result)
    //returns false
    })

```

<br>

## Deleting or Dropping a table

<br>

The **Nosqljsondb()** object has a method for deleting tables called **dropTable()**

The **dropTable()** method takes only one arguement of type => string which represents the name of the table to be deleted from the database

An error is thrown if the table does not exists so it is more advisable to use this method in sync with the **checkTable()** method

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //using this technique prevents errors either the table exists or not
    db.checkTable("table1" , (result) => {
        if(result) {
            //tableName
            db.dropTable("table1")
        }
    })

```

<br>

## Selection and Getting data from the database

<br>

The **Nosqljsondb()** object has a method called **selectFrom()** for selecting items from a table

The **selectFrom()** method takes 4 necessary arguements

* The first is a value of type => "string" which represents the name of the table from which the data is to be selected from

* The second is an array of strings. In this array, each string represents the name of the column to be returned after the search and selection is made. Leaving the array empty [ ] returns all columns available in the table

* The third is an object which performs similar function as the SQL where clause .

    It is only useful when you want to select items that match a certain value. It has two properties namely _columns_ and _equals_ whose values are arrays.
    
    The two arrays must be equal in length.
    
    Members of the two arrays whose indexes matches are used as the comparision pairs.
    
    Like the name of the property says, the "columns" property houses an array of column names to be searched and the "equals" property houses an array of values which the column specified in the "columns" property whose index is same as the that of the value in the equals property array is to be searched for.

    Example on the where-like object
    ```javascript
        {
            columns : ["column1"],
            equals : ["hi"]
        }
    ```
    This searches for where "column1" contains "hi"

    The two arrays can have more than one values and it searches as long as the values have equal indexes

<br>

* The fourth / last arguement of the **selectFrom()** method is a callback function whose parameter represents the result of the selection


<br>

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    // this returns all the columns without any conditions
    db.selectFrom("table1",[], null , (result) => {
    
    console.log(JSON.stringify(result))
    
    });

    // this returns "column1" from the table without any conditions
    db.selectFrom("table1",["column1"], null , (result) => {
    
    console.log(JSON.stringify(result))
    
    });

    //this returns all columns based on conditions and where matches are found
    //condition is where column1 == hello
    db.selectFrom("table1",[], {
    columns : ["column1"],
    equals : ["hello"]
    } , (result) => {
    
    console.log(result.column1)
    //returns => [ ]
    //the result.column1 is an empty array [ ] because based on the insertion made in the table earlier, column1 does not contain any value == "hello"
    
    });

```
<br>

### The search result

The result of the selection is an object whose properties are the selected columns whose values are arrays of the search / selection result

<br>

#### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //this returns all columns based on conditions and where matches are found
    //condition is where column1 == hi
    db.selectFrom("table1",[], {
    columns : ["column1"],
    equals : ["hi"]
    } , (result) => {
    console.log(result.column1)
    //returns => ["hi"]
    });

    //this returns all columns based on conditions and where matches are found
    //condition is where column1 == hi and column2 == hey
    db.selectFrom("table1",["column1","column2"], {
    columns : ["column1","column2"],
    equals : ["hi","hey"]
    } , (result) => {
    console.log(result.column1,result.column2)
    //returns => ["hi"]  ["hey"]
    });

```

<br>

<br>

## Updating columns in a table

<br>

The **Nosqljsondb()** object has a method called **updateTable()** for updating columns in a table where matches specified are found

The **updateTable()** method takes three arguements

* The first is of type => "string" and it represents the name of the table to be updated

* The second is an object whose property is the name of the column to be updated in the table

    The property value , is the value which the specified column is to be searched for

* The third / last arguement is the replacement value

    It is the value which the column is to be updated with where the matches are found

<br>

### Example

<br>

```javascript

    //importing the module
    const {Nosqljsondb} = require("nosql-json-db");

    //creating an instance of Nosqljsondb
    const db = new Nosqljsondb("path/to/empty/json/file.json");

    //tableName , search object , replacement value
    db.updateTable("table2" , {
    column2 : "hey"
    }, "nice")
    //searches column2 in table1 for "hey" and replaces it with "nice" if the search is successful

```

<br>


# Errors and Debugging

<br>

An error is thrown if a table does not exist and you are trying to perform actions on it

There might be file system errors if you try using a loop to make queries and if you do not supply the right file path to the JSON file which would serve as the database

If you find any errors or bugs , please create an issue in this repository with full descriptions about the error

<br>

# Projects where this module has been used

## [Amabolearn data server](https://github.com/udezueoluomachi/amabolearn-dataserver)

A nodejs server for serving data to the client-side based on post requests

<br>

# Support

<br>

If you like this project please give it a star

You are free to fork this repository and make a pull request if you have features you want to add or if you want to contribute to this project

<br>

# Developer

Udezue Oluomachi Chimaobi

[Github profile](https://github.com/udezueoluomachi)

[Twitter profile](https://twitter.com/BasilChimaobi?s=08)

[Facebook profile](https://facebook.com/udezueoluomachi.chimaobi)

Please do check out my github profile to see some of my other projects

Also follow me on facebook , github and twitter. Thanks !

<br>

## View project

[View on NPM](https://npmjs.com/package/nosql-json-db)

[View on Github](https://github.com/udezueoluomachi/nosql-json-db.git)