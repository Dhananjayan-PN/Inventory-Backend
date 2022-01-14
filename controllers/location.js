const Location = require("../models/location.model.js");

exports.create = (req, res) => {
	const newLocation = new Location({
		name: req.body.name,
		capacity: req.body.capacity,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip
  });
  newLocation
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the location.",
      });
    });
}

exports.findAll = (req, res) => {
  Location.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving locations.",
			});
		});
};

exports.findOne = (req, res) => {
	Location.findById(req.params.locationId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving location with id " + req.params.locationId,
      });
    });
}

exports.update = (req, res) => {
	Location.findByIdAndUpdate(
    req.params.locationId,
    {
			...req.body.name && {name: req.body.name},
			...req.body.capacity && {capacity: req.body.capacity},
			...req.body.address && {address: req.body.address},
			...req.body.city && {city: req.body.city},
			...req.body.state && {state: req.body.state},
			...req.body.zip && {zip: req.body.zip}
		},
		{new: true}
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating location with id " + req.params.locationId,
      });
    });
}

exports.delete = (req, res) => {
	Location.findByIdAndDelete(req.params.locationId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId,
        });
      }
      res.send({ message: "Location deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete location with id " + req.params.locationId,
      });
    });
}
