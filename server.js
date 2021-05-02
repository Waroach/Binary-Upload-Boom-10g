// Comment on line you are working on or have completed
//<-Above completed or Working on by Brent

//                                  GOALS
// choose  color pallet
//<- Changed background to green/gold gradient to keep the money theme of 10gs. Feel free to change if you find a better fit for the website. - Nick
// choose change for Binary Upload Boom
//<- 
// choose change for The #100Devs Social Network
//<-
// change button styles like shadows 
//<- Gaby
// make buttons images different
//<- 



//                               STRETCH GOALS
// 1) pull daily images from some repo or something along these lines. like maybe background.
//<- 
// or maybe instead of pulling from pc. 
//<- 
// it gives choice from either REPO or from picture
//<- 
// Add a dislike counter
//<- 
// add comments from users
//<- 



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
