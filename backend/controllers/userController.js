import asyncHandler from "express-async-handler";
import genericResponse from "../utils/genericWebResponses.js";
import Users from "../models/UsersModel.js";
import mongoose from "mongoose";

const addNewUser = asyncHandler(async (req, res) => {
  try {
    const post = req.body;
    post.createdDate = new Date(
      new Date() - new Date().getTimezoneOffset() * 60000
    );
    post.recordType = "I";
    const newUser = new Users(post);
    const addUser = await newUser.save();
    let successResponse = genericResponse(
      true,
      "New User added successfully.",
      addUser
    );
    res.status(200).json(successResponse);
  } catch (error) {
    console.error("Error in addNewUser Controler", error);
    let errorResponse = genericResponse(false, error.message, []);
    res.status(400).json(errorResponse);
  }
});

const fetchUser = asyncHandler(async (req, res) => {
  try {
    const query = {};
    const fetchUsers = await Users.find(query);
    let successResponse = genericResponse(
      true,
      "Users fetched Successfully",
      fetchUsers
    );
    res.status(200).json(successResponse);
  } catch (error) {
    console.error("Error in fetchUser", error);
    let errorResponse = genericResponse(false, error.message, []);
    res.status(400).json(errorResponse);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  let post = req.body;
  try {
    console.log("deleteQuery");
    const deleteQuery = { _id: mongoose.Types.ObjectId(post._id) };
    console.log("deleteQuery1");
    if (post._id != undefined && post._id != "") {
      await Users.deleteOne(deleteQuery);
      res
        .status(201)
        .json(genericResponse(true, "User Deleted Successfully!", []));
    } else {
      res.status(400).json(genericResponse(false, "User not found!", []));
    }
  } catch (error) {
    let errorDeleteUser = genericResponse(false, error.message, []);
    res.status(400).json(errorDeleteUser);
  }
});
export { addNewUser, fetchUser, deleteUser };
