const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const Beverage = require("../models/Beverage");
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

//Selection Page
router.get("/selection", forwardAuthenticated, (req, res) =>
  res.render("selection")
);

//Beverage Page
router.get("/beverage", forwardAuthenticated, (req, res) =>
  res.render("beverage")
);

//Beverage
router.post("/beverage", ensureAuthenticated, async (req, res) => {
  var myData = new Beverage(req.body);
  myData
    .save()
    .then((item) => {
      console.log("item saved to database");
    })
    .catch((err) => {
      res.status(400).send("unable to save");
    });

  console.log("beverage complete");
  res.redirect("/selection");
});

// //Groupname Page
// router.get("/groupname", forwardAuthenticated, (req, res) =>
//   res.render("groupname")
// );

// Register
router.post("/register", (req, res) => {
  const { name, username, password, password2 } = req.body;
  let errors = [];

  if (!name || !username || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      username,
      password,
      password2,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("register", {
          errors,
          name,
          username,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          username,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/selection",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/beverage", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/selection",
    failureRedirect: "/users/beverage",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
