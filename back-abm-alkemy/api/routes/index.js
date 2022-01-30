const express = require("express");
const router = express.Router();
const { Abm, User } = require("../db");


router.post("/create", async (req, res) => {
  const { user, concept, amount, date, type, category } = req.body;

  try {

    const findUser = await User.findOne({
      where: {
        name: user,
      },
    });

    const newAbm = await Abm.create({ concept, amount, date, type, category });

    await newAbm.setUsers(findUser);
    return res.json({ res: "success" });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ res: "fail", txt: error });
  }
});


router.post("/delete", async (req, res) => {
  const {id}  = req.body;

  try {

    const findAbm = await Abm.findOne({
      where: {
        id: id,
      },
    });
    await findAbm.destroy();

    return res.json({ res: "success" });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ res: "fail", txt: error });
  }
});

router.post("/log-in", async (req, res) => {
  const { user, password } = req.body;
  console.log("soy el user pass:");
  console.log(user + password);

  try {
    const rta = await User.findOne({
      where: {
        name: user,
      },
    });

    // return res.status(200).json(rta[0].abms)
    return res.status(200).json(rta);
  } catch (error) {
    return res.status(200).json({ user: "" });
  }
});


router.post("/sign-up", async (req, res) => {
  const { password, name } = req.body;
  console.log("soy el password y name:" + name);
  console.log(password);

  try {
    const find = await User.findOne({
      where: {
        name: name,
      },
    }).then(async function (user) {
      if(user) return res.status(200).json({error:`user "${name}" already exist, please create another`});
      if (!user) {
        const rta = await User.create({ name: name, password: password });
        return res.status(200).json(rta);
      }
    });
  } catch (error) {
    return res.status(505).json(error);
  }
});

router.post("/user", async (req, res) => {
  const { user } = req.body;

  try {
    const rta = await User.findAll({
      where: {
        name: user,
      },
      include: {
        model: Abm,
        attributes: ["concept", "amount", "date", "type", "id", "category"],
        through: { attributes: [] },
      },
    });

    // return res.status(200).json(rta[0].abms)
    return res.status(200).json(rta);
  } catch (error) {
    return res.status(505).json(error);
  }
});

module.exports = router;
