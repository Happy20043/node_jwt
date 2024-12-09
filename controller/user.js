import User from "../model/user.js";

export const getUser = async (req, res) => {
  try {
    const userData = await User.find(req.query);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndDelete(req.params.id, req.body);
    res.send({ userData, message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
}
