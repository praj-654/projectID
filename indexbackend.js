const express = require('express')
const app = express()
const port = 5000
const mongoDB= require("./db")

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 if(req.method==='OPTIONS'){
   return res.sendStatus(200);
}
  next();
}); 





mongoDB()
app.get('/', (req, res) => { 
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})