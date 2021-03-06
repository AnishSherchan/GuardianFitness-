const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
// ? API for user ID
router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Apis for user Informations
// Todo Comeplete Put REquest for User Information
// ? API for  user_inforamtion Check
router.get("/userinfo", authorization, async (req, res) => {
  try {
    const userinfo = await pool.query(
      "SELECT * FROM user_info WHERE user_id = $1",
      [req.user]
    );
    res.json(userinfo.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

router.get("/userage", authorization, async (req, res) => {
  try {
    const userinfo = await pool.query(
      "SELECT dob FROM user_info WHERE user_id = $1",
      [req.user]
    );
    const dob = userinfo.rows[0].dob;
    const year = dob.getFullYear();
    const d = new Date();
    let today = d.getFullYear();
    const age = today - year;
    res.json(age);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ? APi for user Information Insertion
router.post("/userinfo", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const { gender, dob, weight, height, goal } = req.body;
    const user_id = req.user;
    //?  insert user data
    let newUserInfo = await pool.query(
      "INSERT INTO user_info (user_id, gender, dob, weight, height, goal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, gender, dob, weight, height, goal]
    );
    res.json(newUserInfo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});

// ? API for  user_inforamtion
router.get("/userinformation", authorization, async (req, res) => {
  try {
    const userinfo = await pool.query(
      "SELECT * FROM user_info WHERE user_id = $1",
      [req.user]
    );
    res.json(userinfo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ? user goal update
router.put("/usergoal", authorization, async (req, res) => {
  try {
    const { selectedgoal } = req.body;
    const user_id = req.user;
    const usergoalupdate = await pool.query(
      "UPDATE user_info SET goal = ($1) WHERE user_id = ($2) RETURNING * ",
      [selectedgoal, user_id]
    );
    res.json(usergoalupdate.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/userdate", authorization, async (req, res) => {
  try {
    const { dobs } = req.body;
    const user_id = req.user;
    const userdate = await pool.query(
      "UPDATE user_info SET dob = ($1) WHERE user_id = ($2) RETURNING * ",
      [dobs, user_id]
    );
    res.json(userdate.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// ? user wEIGHT AND HEIGHT update
router.put("/userheightweight", authorization, async (req, res) => {
  try {
    const { selectedHeight, selectedWeight } = req.body;
    const user_id = req.user;
    const userweiheiupdate = await pool.query(
      "UPDATE user_info SET height = ($1), weight = ($2) WHERE user_id = ($3) RETURNING * ",
      [selectedHeight, selectedWeight, user_id]
    );
    res.json(userweiheiupdate.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// ? user Body metric insert
router.put("/userbodymetric", authorization, async (req, res) => {
  try {
    const { neck, shoulder, forearm, biceps, hip, thigh, claves } = req.body;
    const user_id = req.user;
    const userMetric = await pool.query(
      "UPDATE user_info SET neck_size = ($1), shoulder_size = ($2), forearm_size = ($3), biceps_size = ($4), hip_size = ($5), thigh_size = ($6), claves_size = ($7) WHERE user_id = ($8) RETURNING * ",
      [neck, shoulder, forearm, biceps, hip, thigh, claves, user_id]
    );
    res.json(userMetric.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/userbodymetric", authorization, async (req, res) => {
  try {
    const userinfo = await pool.query(
      "SELECT neck_size, shoulder_size, forearm_size, biceps_size, hip_size, thigh_size, claves_size FROM user_info WHERE user_id = ($1)",
      [req.user]
    );
    res.json(userinfo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Api for user Health Information
// ? Api for user_health condition insertion
router.post("/userhealth", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const { condition } = req.body;
    const user_id = req.user;
    //?  insert user data
    let newUserHealth = await pool.query(
      "INSERT INTO user_health (condition_id, user_id ) VALUES ($1, $2) RETURNING *",
      [condition, user_id]
    );
    res.json(newUserHealth.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});

// ? Api for user_health condition Delete
router.delete("/userhealth", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const user_id = req.user;

    const userhealth = await pool.query(
      "SELECT * FROM user_health WHERE user_id = ($1)",
      [user_id]
    );
    if (userhealth.rowCount > 0) {
      const DelHealth = await pool.query(
        "DELETE FROM user_health WHERE user_id = ($1)",
        [user_id]
      );
    }
    res.json("Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});

router.get("/userhealth", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const user_health = await pool.query(
      "SELECT * FROM user_health WHERE user_id = ($1);",
      [user_id]
    );
    res.json(user_health.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Supplement Information
router.get("/supplements", async (req, res) => {
  try {
    const supplements = await pool.query("SELECT * FROM supplement;");
    res.json(supplements.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ? Supplement Informartion of specific id
router.post("/supplement", async (req, res) => {
  try {
    const { id } = req.body;
    //?  insert user data
    const supplements = await pool.query(
      "SELECT * FROM supplement WHERE supplement_id = ($1);",
      [id]
    );
    res.json(supplements.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! exercise Information
router.get("/exercises", async (req, res) => {
  try {
    const exercises = await pool.query("SELECT * FROM exercises;");
    res.json(exercises.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});
// ? exercise Informartion of specific id
router.post("/exercise", async (req, res) => {
  try {
    const { id } = req.body;
    //?  insert user data
    const exercise = await pool.query(
      "SELECT * FROM exercises WHERE ex_id = ($1);",
      [id]
    );
    res.json(exercise.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Plans
router.get("/plan", async (req, res) => {
  try {
    const plan = await pool.query("SELECT * FROM plan;");
    res.json(plan.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});
// ? Plan Informartion of specific id
router.post("/specPlan", async (req, res) => {
  try {
    const { id } = req.body;
    //?  insert user data
    const Plan = await pool.query("SELECT * FROM plan WHERE plan_id = ($1);", [
      id,
    ]);
    res.json(Plan.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});
// ? UserPlan
router.get("/userPlan", authorization, async (req, res) => {
  try {
    const userplan = await pool.query(
      "SELECT * FROM user_plan WHERE user_id = $1",
      [req.user]
    );
    res.json(userplan.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

router.post("/userPlan", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const { plan_id } = req.body;
    const user_id = req.user;
    //?  insert user data

    const userplan = await pool.query(
      "SELECT * FROM user_plan WHERE user_id = ($1)",
      [user_id]
    );
    if (userplan.rowCount > 0) {
      const Delpan = await pool.query(
        "DELETE FROM user_plan WHERE user_id = ($1)",
        [user_id]
      );
      let newplan = await pool.query(
        "INSERT INTO user_plan (user_id, plan_id ) VALUES ($1, $2) RETURNING *",
        [user_id, plan_id]
      );
      res.json(newplan.rows[0]);
    } else {
      let newplan = await pool.query(
        "INSERT INTO user_plan (user_id, plan_id ) VALUES ($1, $2) RETURNING *",
        [user_id, plan_id]
      );
      res.json(newplan.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});

module.exports = router;
