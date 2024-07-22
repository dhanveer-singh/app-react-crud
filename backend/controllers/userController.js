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
const updateUser = asyncHandler(async (req, res)=>{

})
const deleteUser = asyncHandler(async (req, res) => {
  let { _id } = req.body;
  if (!_id) {
    return res.status(400).json(genericResponse(false, "User ID is required!", []));
  }

  try {
    console.log("deleteQuery Try");
    const deleteQuery = { _id: _id };
    console.log("deleteQuery1", deleteQuery);
    let result = await Users.deleteOne(deleteQuery);
    if (result.deletedCount === 0) {
      return res.status(404).json(genericResponse(false, "User Not Found!", []));
    }
    return res.status(200).json(genericResponse(true, "User Deleted Successfully!", []));
  } catch (error) {
    let errorDeleteUser = genericResponse(false, error.message, []);
    res.status(400).json(errorDeleteUser);
  }
});
export { addNewUser, fetchUser, updateUser, deleteUser };
