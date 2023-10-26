const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Joi = require("joi");
const fetchUser = require("../middleware/fetchUser");
const QuizCounter = require("../models/QuizCounter")

router.post("/hostquiz", fetchUser, async (req, res) => {
  try {
    await QuizCounter.updateOne(
      { _id: '653a2d4b8741a53ec501ef42' },
      {
        $inc: { value: 1 },
        $currentDate: { lastModified: true }
      }
    );
    let counter = await QuizCounter.findById("653a2d4b8741a53ec501ef42")
    const quizObj = { ...req.body, quiz_id: counter.value, creator_id: req.user.id }
    quiz = await Teacher.create(quizObj)
    res.json({ quiz })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }

})

router.get("/joinquiz/:id", fetchUser, async (req, res) => {
  try {
    const quiz = await Teacher.find({ quiz_id: req.params.id }).select(["quiz_name", "no_of_question", "duration", "questions"])
    res.json(quiz)
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

{/*let ValidationForCreateQuiz = [
  body("quiz_name", "Enter a valid quiz name").isLength({ min: 3 }),
  body("no_of_question", "Enter less than 20 no").isInt({ min: 1, max: 20 }),
  body("duration", "Enter less than 20 min").isInt({ min: 1, max: 20 }),
];

// ROUTE 1: Create a quizz using:POST "/api/host/create/".
Router.get("/create", ValidationForCreateQuiz, async (req, res) => {
  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
  } catch (error) {}
});

//ROUTE 2

//Unique no Generator (6-digit)
async function generateUniqueNumber() {
  let randomNum = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

  try {
    //Checking that it already exist or not
    const existingNumber = await teacher.findOne({ quiz_id: randomNum });
    if (existingNumber) {
      // If the number already exists, generate a new one recursively
      return generateUniqueNumber();
    } else {
      // If the number is unique, return it
      return randomNum;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Dynamic Link creator

// ROUTE 2: Adding questions in quizz using:POST "/api/host/create/add_q".
Router.get("/create/add_q", (req, res) => {
  const UniqueNo = generateUniqueNumber()
    .then((uniqueNumber) =>
      console.log(`Generated unique number: ${uniqueNumber}`)
    )
    .catch((error) => console.error(error));

  const customLink = `http://localhost:3000/join/${UniqueNo}`;
  res.json({ link: customLink });
});*/}

module.exports = router;
