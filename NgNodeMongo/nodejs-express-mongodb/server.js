const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "App running." });
// });

require("./app/routes/movie.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "sample_mflix"
  })
  .then(() => {
    console.log("Connected to the database!");
    // const connection = db.mongoose.connection;
    // resizeBy.json(db.listingsAndReviews);
    // var dbo = connection.db('sample_mflix');
    // dbo.collection('listingsAndReviews');
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });