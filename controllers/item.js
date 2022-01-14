const Item = require("../models/item.model.js");

exports.create = (req, res) => {
	const newItem = new Item({
		name: req.body.name,
		location: req.body.location,
		units: req.body.units, 
		cost: req.body.cost
  });
  newItem
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the item.",
      });
    });
}

exports.findAll = (req, res) => {
  Item.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving items.",
			});
		});
};

exports.findOne = (req, res) => {
	Item.findById(req.params.itemId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving item with id " + req.params.itemId,
      });
    });
}

exports.update = (req, res) => {
	Item.findByIdAndUpdate(
    req.params.itemId,
    {
			...req.body.name && {name: req.body.name},
			...req.body.location && {location: req.body.location},
			...req.body.units && {units: req.body.units},
			...req.body.cost && {cost: req.body.cost},
		},
		{new: true}
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating item with id " + req.params.itemId,
      });
    });
}

exports.delete = (req, res) => {
	Item.findByIdAndDelete(req.params.itemId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId,
        });
      }
      res.send({ message: "Item deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete item with id " + req.params.itemId,
      });
    });
}
