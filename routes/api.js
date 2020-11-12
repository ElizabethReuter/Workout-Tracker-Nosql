const router = require("express").Router();
const Workouts = require("../models/workout.js");

// adds exercises to previous workout plan
router.post("/api/workouts", ({ body }, res) => {
  Workouts.create(body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    }); 
});

//Model.findByIdAndUpdate(id, { $set: { name: 'jason bourne' }}, options, callback)
//changed workouts.find to .findByIDAndUpdate bc of mongoose
router.put("/api/addExercise/:id", (req, res) => {
// tell the db that we want to get the workout of the id (req.params.id) and then add to its exercises what we have in req.body
    Workouts.findByIdAndUpdate(req.params.id, { $set: { exercises: req.body}})
    // ^^ in find we need to tell it what to find in the {id:req.body.id}
    .then(response => {
      console.log(response);
      res.json(response);
    // want to take this response and parse it into the workouts object (ex.... workout.exercises.push/add(req.body), and then update to the db
    })
    .catch(err => {
    res.status(400).json(err);
    });
    // console.log(req.body);
  });


// View the combined weight of multiple exercises on stats page
router.get("/api/workouts/range", (req, res) => {
    Workouts.find({})
    // .sort()
    .then(dbTransaction => {
      console.log("?????");
      res.json(dbTransaction);
      console.log("****RANGE");
      console.log(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//added 
router.get("/api/workouts", (req, res) => {
  Workouts.find()
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

module.exports = router;