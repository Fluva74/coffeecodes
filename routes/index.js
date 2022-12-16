const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

//Selection Page
router.get("/selection", ensureAuthenticated, (req, res) =>
  res.render("selection", {
    user: req.user,
  })
);

//Beverage Page
router.get("/beverage", ensureAuthenticated, (req, res) =>
  res.render("beverage", {
    user: req.user,
  })
);

//Groupname Page
// router.get("/groupname", ensureAuthenticated, (req, res) =>
//   res.render("groupname", {
//     user: req.user,
//   })
// );

module.exports = router;
