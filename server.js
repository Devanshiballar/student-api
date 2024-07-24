const express = require('express');
const PORT = 5000
const app = express();
require('./config/db')
const StudentRoute=require("./routes/studentRoutes")
const ParentRoute = require("./routes/parentRoutes")


app.use(express.json());
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
app.use("/api/student",StudentRoute)
app.use("/api/parent",ParentRoute)

app.listen(PORT,()=>{
    console.log(`listening on port = ${PORT}`);
});