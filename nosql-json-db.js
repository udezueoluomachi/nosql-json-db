//version 1.0.0
(!function() {
    const fs = require("fs");
    const { isArray, isObject } = require("util");
    
    module.exports.Nosqljsondb = class Nosqljsondb {
        constructor (jsonFile) {
            this.dbFile = jsonFile;
        }

        createTable(tableName , columns) {
            if(!tableName || !isArray(columns)) {
                throw new Error("Error while creating table, invalid arguements passed into function")
            }
            let dbFile = this.dbFile;
            fs.readFile(dbFile, function (err, data) {
                if (err) throw err;
                let db;
                if(data.toString().trim() == "") {
                    db = []
                } else {
                    db = JSON.parse(data.toString());
                }
                
                let tableExists = false;

                if(db.length > 0) {
                    db.forEach(
                        function (e) {
                            if(e.tableName == tableName) {
                              tableExists = true;
                              return;
                            }
                        }
                    )
                }

                if (tableExists) {
                    throw new Error(`Could not create table (${tableName})\nTable already exists`)
                }

                else {
                    const table = {
                        tableName : tableName ,
                        columns : {}
                    };
                    columns.forEach(e => {
                        table.columns[e] = [];
                    });
                    db.push(table);
                    fs.writeFile(dbFile , JSON.stringify(db , null , "  ") ,(err) => {
                        if(err) throw err;
                    })
                }

            });
        }

        insertInto(tableName , values) {
            if(!tableName || !isObject(values)) {
                throw new Error("Error while inserting into table, invalid arguements passed into function")
            }
            let dbFile = this.dbFile;
            fs.readFile(dbFile, function (err, data) {
                if (err) throw err;
                let db;
                if(data.toString().trim() == "") {
                    db = []
                } else {
                    db = JSON.parse(data.toString());
                }
                let tableExists = false;
    
                if(db.length > 0) {
                    db.forEach(
                        function (e) {
                            if(e.tableName == tableName) {
                              tableExists = true;
                              return;
                            }
                        }
                    )
                }
                
                else {
                    throw new Error(`Could not insert data into empty database`)
                }
                
                if (!tableExists) {
                    throw new Error(`Could not insert into (${tableName})\nTable does not exist`)
                }
    
                else {
                    let tableIndex;
                    db.forEach(
                        e => {
                            if(e.tableName == tableName){
                                tableIndex = db.indexOf(e);
                            }
                        }
                    )
                    for (let a in values) {
                            db[tableIndex].columns[a].push(values[a]);
                    }
                    fs.writeFile(dbFile , JSON.stringify(db , null , "  ") ,(err) => {
                        if(err) throw err;
                    })
                }
            });
        }

        //tableName , array of columns to be returned , sql where clause equality simulator , callback
        selectFrom(tableName , params ,where , callback) {
            if(!tableName || !isArray(params) || !callback) {
                throw new Error("Error while searching table, invalid arguements passed into function")
            }
            let dbFile = this.dbFile;
            fs.readFile(dbFile, (err, data) => {
                if (err) throw err;
                let db;
                if(data.toString().trim() == "") {
                    db = []
                } else {
                    db = JSON.parse(data.toString());
                }
                let tableExists = false;
    
                if(db.length > 0) {
                    db.forEach(
                        function (e) {
                            if(e.tableName == tableName) {
                              tableExists = true;
                              return;
                            }
                        }
                    )
                }
                
                else {
                    throw new Error(`Could not search for data in empty database`)
                }
                
                if (!tableExists) {
                    throw new Error(`Could not search for data in table (${tableName})\nTable does not exist`)
                }
    
                else {
                    let tableIndex , responseObject = {};
                    db.forEach(
                        e => {
                            if(e.tableName == tableName){
                                tableIndex = db.indexOf(e);
                            }
                        }
                    )//where end

                    if(params.length > 0) {
                      params.forEach(
                        e => {
                          responseObject[e] = db[tableIndex].columns[e];
                        })

                    }
                    else {
                        responseObject = db[tableIndex].columns;
                    }
                    if(where && (where.columns.length && where.equals.length) > 0 && where.columns.length === where.equals.length) {
                        if(!isObject(where)) {
                            throw new Error(`Could not search table\nInvalid arguements passed`)
                        }
                        const matchesIndex = [] , search = where.equals;
                        search.forEach(
                            () => {
                                matchesIndex.push([])
                            }
                        )
                        //trying to search each specified column
                        let index = 0;
                        where.columns.forEach(
                            e => {
                                db[tableIndex].columns[e].forEach(
                                    f => {
                                        if (f == search[index]) {
                                            matchesIndex[index].push(db[tableIndex].columns[e].indexOf(f));
                                        }
                                        else {
                                            matchesIndex[index].push("no");
                                        }
                                    }
                                )
                                index++;
                            }
                        )
                        //handling the searches
                        const columnMatchIndex = []
                        for(let i = 0;  i < matchesIndex[0].length;) {
                            if(matchesIndex.every( e => e[i] == matchesIndex[0][i]) && matchesIndex[0][i] != "no") {
                                columnMatchIndex.push(i)
                                if(where.break) {
                                    break;
                                }
                            }
                            i++;
                        }
                        if(columnMatchIndex.length > 0) {
                            params.forEach(
                                e => {
                                    responseObject[e] = [];
                                    columnMatchIndex.forEach(
                                        f => {
                                            responseObject[e].push(db[tableIndex].columns[e][f])
                                        }
                                    )
                                }
                            )
                        }
                        else {
                            for(let x in responseObject) {
                                responseObject[x] = []
                            }
                        }
                    }
                    //where
                    callback(responseObject)
                }
                
            });
        }
        
        checkTable(tableName, callback) {
          
            if(!tableName || !callback) {
                throw new Error("Error while searching database, invalid arguements passed into function")
            }
            let dbFile = this.dbFile;
            fs.readFile(dbFile, (err, data) => {
                if (err) throw err;
                let db;
                if(data.toString().trim() == "") {
                    db = []
                } else {
                    db = JSON.parse(data.toString());
                }
                let tableExists = false;
    
                if(db.length > 0) {
                    db.forEach(
                        function (e) {
                            if(e.tableName == tableName) {
                              tableExists = true;
                              return;
                            }
                        }
                    )
                }
                callback(tableExists)
            });
        }
        
        dropTable(tableName) {
            if (!tableName) {
                throw new Error(`Could not drop table(s)\nInvalid arguements passed into function`);
            }
            let dbFile = this.dbFile;
            fs.readFile(dbFile, (err, data) => {
                if (err) throw err;
                let db;
                if(data.toString().trim() == "") {
                    db = []
                } else {
                    db = JSON.parse(data.toString());
                }
                let tableExists = false;
    
                if(db.length > 0) {
                    db.forEach(
                        function (e) {
                            if(e.tableName == tableName) {
                                tableExists = true;
                                return;
                            }
                        }
                    )
                }
                if(!tableExists) {
                    throw new Error(`Could not drop table (${tableName})\nTable does not exist`);
                }
                
                let tableIndex;
                db.forEach(
                    e => {
                        if(e.tableName == tableName){
                            tableIndex = db.indexOf(e);
                        }
                    }
                )
                db.splice(tableIndex , 1);

                fs.writeFile(dbFile , JSON.stringify(db , null , "  ") , (err) => {
                    if(err) throw err;
                })
            });
        }

        updateTable(tableName , where , value) {
            if(!tableName || !isObject(where) || !value) {
                throw new Error("Error while updating table, invalid arguements passed into function")
            }
            let dbFile = this.dbFile;
            fs.readFile(dbFile, function (err, data) {
                if (err) throw err;
                let db;
                if(data.toString().trim() == "") {
                    db = []
                } else {
                    db = JSON.parse(data.toString());
                }
                let tableExists = false;
    
                if(db.length > 0) {
                    db.forEach(
                        function (e) {
                            if(e.tableName == tableName) {
                              tableExists = true;
                              return;
                            }
                        }
                    )
                }
                
                else {
                    throw new Error(`Could not insert data into empty database`)
                }
                
                if (!tableExists) {
                    throw new Error(`Could not update table (${tableName})\nTable does not exist`)
                }
    
                else {
                    let tableIndex;
                    db.forEach(
                        e => {
                            if(e.tableName == tableName){
                                tableIndex = db.indexOf(e);
                            }
                        }
                    )

                    for(let a in where) {
                        db[tableIndex].columns[a].forEach(
                            e => {
                                if(e == where[a]) {
                                    let index = db[tableIndex].columns[a].indexOf(e);
                                    db[tableIndex].columns[a][index] = value;
                                }
                            }
                        )
                    }

                    fs.writeFile(dbFile , JSON.stringify(db , null , "  ") ,(err) => {
                        if(err) throw err;
                    })
                }
            });
        }
    }
}())