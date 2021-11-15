const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  CelebrityModel.create(req.body)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(() => {
      res.render("./celebrities/new-celebrity.hbs");
    });
});

router.get("/celebrities", (req, res, next) => {
  CelebrityModel.find()
    .then((response) => {
      res.render("./celebrities/celebrities.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
