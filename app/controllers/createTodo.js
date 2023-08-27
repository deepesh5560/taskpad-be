const createTodoSchema = require("../models/createNotes");

exports.createTodo = async (req, res, next) => {
  try {
    const { id } = req.user;
    let data = req.body.note;
    let catId = req.body.cateogoryId;
    const findTodo = await createTodoSchema.find({
      note: data,
      userId: id,
      cateogoryId: catId,
    });

    if (!data) {
      res.status(400).json({ error: "No note found" });
    }
    if (findTodo.length > 0) {
      res.status(422).json({ error: "todo already exists" });
    } else {
      const notes = await createTodoSchema.create({
        note: data,
        userId: id,
        cateogoryId: catId,
        completed: false,
      });
      res
        .status(200)
        .send({ data: notes, message: "Todo created successfully" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllTodo = async (req, res, next) => {
  const { id } = req.user;
  const catId = req.params.cateoId;
  try {
    const notes = await createTodoSchema.find({
      userId: id,
      cateogoryId: catId,
    });
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const deletedItem = await createTodoSchema.findByIdAndDelete(req.params.id);
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

exports.updateTodo = async (req, res, next) => {
  try {
    let note = req.body.header.note;
    let updatedItem;
    if (note) {
      updatedItem = await createTodoSchema.findByIdAndUpdate(
        req.params.id,
        { $set: { note: note } },
        { new: true }
      );
    } else {
      updatedItem = await createTodoSchema.findByIdAndUpdate(
        req.params.id,
        { $set: { completed: req.body.header.completed } },
        { new: true }
      );
    }

    if (!updatedItem) {
      res.status(400).send({ error: "Item not found" });
    }
    res
      .status(200)
      .send({ data: updatedItem, message: "item updated successfully" });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
