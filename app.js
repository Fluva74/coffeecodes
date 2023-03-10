const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// Passport Config
require("./config/passport")(passport);

mongoose.connect(
  "mongodb+srv://Lebowski:LilYellowCup@cluster0.1zyvhqx.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
