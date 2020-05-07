const express = require("express");
const morgan = require("morgan");

const app = express();
const apps = require('./playstore-data.js');

app.use(morgan("common"));

const ratingSort = function (a, b) {
  return b.Rating - a.Rating;
};

const appSort = function (a, b) {
  return a.App.toLowerCase() === b.App.toLowerCase() ? 0 : a.App.toLowerCase() > b.App.toLowerCase() ? 1 : -1;
};


app.get("/apps", (req, res) => {
    const {sort, genres} = req.query;

    let results = [...apps];

    if (sort) {
      if (!["rating", "app"].includes(sort)) {
        return res.status(400).send("Sort must be one of rating or app");
      }
    }

    if (genres) {
      if (!["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(genres
        ))
      {
        return res.status(400).send("Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card");
      }
      results = apps.filter((app) => app.Genres.includes(genres));
    }


    if (sort === "rating") {
      console.log(`rating sort`);
      results.sort(ratingSort);
    }
    if (sort === "app") {
      console.log(`app sort`);
      results.sort(appSort);
    }
  res
    .json(results);
});


module.exports = app;

