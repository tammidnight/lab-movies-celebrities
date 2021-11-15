const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {
  CelebrityModel.find()
    .then((response) => {
      res.render("./movies/new-movie.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  MovieModel.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("./movies/new-movie.hbs");
      console.log(err);
    });
});

router.get("/movies", (req, res, next) => {
  MovieModel.find()
    .then((response) => {
      res.render("./movies/movies.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  MovieModel.findById(id)
    .populate("cast")
    .then((response) => {
      res.render("./movies/movie-detail.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  MovieModel.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  MovieModel.findById(id)
    .populate("cast")
    .then((response) => {
      CelebrityModel.find().then((celeb) => {
        celeb.forEach((elem) => {
          let castMember = response.cast.find((cast) =>
            cast._id.equals(elem._id)
          );
          let isSelected = castMember !== undefined;
          elem.selected = isSelected;
        });
        res.render("./movies/edit-movie.hbs", { response, celeb });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  MovieModel.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
