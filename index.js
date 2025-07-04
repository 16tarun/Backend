//HEAD
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const signUpRouter = require("./routes/signUp");
const loginRouter = require("./routes/login");
const dashboard = require("./routes/dashboard");
const shape = require("./routes/shape");
//const game=require("./routes/game");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/signUp", signUpRouter);
app.use("/", loginRouter);
app.use("/dashboard", dashboard);
app.use("/shape",shape);
//app.use("/game",game);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/*//=======
//const express = require('express');
//const signUpRouter = require('./routes/signUp');
//const loginRouter = require('./routes/login');
//const cors = require('cors');
const dbConnection = require('./config'); 
//const app = express();
//const port = 3000;

dbConnection();

// app.use(cors({
//   origin: 'http:0.0.0.0',
//   credentials: true, 
// }));
//app.use(cors());
app.use(express.json());

//app.use('/signup', signUpRouter); 
//app.use('/login', loginRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//>>>>>>> a6f3445383beec9b6af59cd5e4e9badc3da3fd1e*/
