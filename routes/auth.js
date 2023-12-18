const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google-signup",
  passport.authenticate("google-signup", { scope: ["profile", "email"] })
);

router.get(
  "/google-signup/callback",
  passport.authenticate("google-signup", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/in");
  }
);

router.get(
  "/google-signin/callback",
  passport.authenticate("google-signin", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/log");
  }
);



router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });

  // req.session.destroy()
  // res.redirect("/");
});

module.exports = router;
