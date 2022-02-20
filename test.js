const {Nosqljsondb} = require("./nosql-json-db.js");

const db = new Nosqljsondb("./db.json");
/*
db.createTable("table1",["column1","column2","column3"]);

db.insertInto("table1",{
    column1 : "hi",
    column2 : "hey",
    column3 : "hello"
});
//tableName , columns , callback which takes the selection result as argument
db.selectFrom("table1",["column1","column2"], {
  columns : ["column1","column2"],
  equals : ["hi","nice"]
  } , (result) => {
  console.log(result.column1,result.column2)
  //returns => ["hi"] , ["hey"]
  });
//tableName , callback which arguement is a boolean
db.checkTable("table1" , (result) => {
  console.log(result)
})
//tableName
db.dropTable("table1")
//tableName , where clause immitation object , value
db.updateTable("table2" , {
  column2 : "very nice"
}, "nice")*/