const db = require("../models");
const Movies = db.movies;

// Create and Save a new t
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a t
    const result = new Movies({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    // Save t in the database
    result
        .save(result)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the t."
            });
        });
};

// Retrieve all t from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Movies.find(condition)
        .then(data => {
            res.send(data);
            // console.log(data);
            // res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving t."
            });
        });
};
// Find a single t with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Movies.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found t with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving t with id=" + id
                });
        });
};

// Update a t by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Movies.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update t with id=${id}. Maybe t was not found!`
                });
            } else res.send({
                message: "t was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating t with id=" + id
            });
        });
};

// Delete a t with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Movies.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete t with id=${id}. Maybe t was not found!`
          });
        } else {
          res.send({
            message: "t was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete t with id=" + id
        });
      });
};

// Delete all t from the database.
exports.deleteAll = (req, res) => {
    Movies.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} t were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all t."
      });
    });
};

// Find all published t
exports.findAllPublished = (req, res) => {
    Movies.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving t."
      });
    });
};