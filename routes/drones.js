const express = require('express');
const router  = express.Router();
const Drone   = require("../models/Drone.model");


// Routes

router.get('/drones', (req, res) => {  // Iteration #2: List all the drones in DB
Drone.find()
  .then((droneArr) => res.render("drones/list", {droneArr}))
  .catch((error)   => console.log("Error getting data from DB", error))
});


router.get('/drones/create', (req, res) => {  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});


router.post('/drones/create', (req, res) => {  // Iteration #3: Add a new drone
  const newDrone = {
    name:       req.body.name,
    propellers: req.body.propellers,
    maxSpeed:   req.body.maxSpeed
  };

  Drone.create(newDrone)
  .then(() => res.redirect("/drones"))
  .catch((error) => console.log("Error creating new Drone in DB", error))
});


router.get('/drones/:_id/edit', (req, res) => {  // Iteration #4: Update the drone
  Drone.findById(req.params._id)
  .then(droneToUpdate => res.render("drones/update-form", {droneToUpdate}))
  .catch((error)      => console.log("Error getting drone data from DB", error))
});


router.post('/drones/:_id/edit', (req, res) => {  // Iteration #4: Update the drone
  const updatedDrone = {
    name:       req.body.name,
    propellers: req.body.propellers,
    maxSpeed:   req.body.maxSpeed
  };
  Drone.findByIdAndUpdate(req.params._id, updatedDrone)
  .then(()       => res.redirect("/drones"))
  .catch((error) => console.log("Error updating drone data in DB", error))
});


router.post('/drones/:id/delete', (req, res) => {  // Iteration #5: Delete  drone
  Drone.findByIdAndDelete(req.params.id)
  .then( ()      => res.redirect("/drones"))
  .catch((error) => console.log("Error deleting drone data", error))
});

module.exports = router;
