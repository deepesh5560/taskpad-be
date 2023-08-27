const cateogory = require("../models/cateogory");
const createTodoSchema = require("../models/createNotes");

exports.createCateogory = async (req, res, next) => {
  try {
    const { id } = req.user;
    let data = req.body.name;

    if (!data) {
      res.status(400).json({ error: "No name found" });
    } else {
      let checkCateo = await cateogory.find({
        name: data,
        userId: id,
      });

      if (checkCateo[0]) {
        console.log(checkCateo);
        res.status(422).json({
          error: `Cateogory with name ${data} already exists`,
          checkCateo: checkCateo,
        });
      } else {
        const notes = await cateogory.create({
          name: data,
          userId: id,
        });
        res
          .status(200)
          .send({ data: notes, message: "Cateogory created successfully" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllCateogories = async (req, res, next) => {
  const { id } = req.user;
  try {
    const notes = await cateogory.find({ userId: id });
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteCateogory = async (req, res, next) => {
  try {
    const { id } = req.user;
    let CatId = req.params.id;
    const toBeDel = await createTodoSchema.deleteMany({
      cateogoryId: CatId,
      userId: id,
    });
    const deletedItem = await cateogory.findByIdAndDelete(CatId);
    if (!deletedItem) {
      res.status(400).send({ error: "Item not found" });
    }
    res
      .status(200)
      .send({ data: deletedItem, message: "item deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// exports.updateTodo = async (req, res, next) => {
//   try {
//     const updatedItem = await createTodoSchema.findByIdAndUpdate(
//       req.params.id,
//       { note: req.body.note }
//     );
//     if (!updatedItem) {
//       res.status(400).send({ error: "Item not found" });
//     }
//     res
//       .status(200)
//       .send({ data: updatedItem, message: "item updated successfully" });
//   } catch (e) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
