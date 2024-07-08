import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  lastModifiedDate: {
    type: Date,
  },
  recordType: {
    type: String,
    required: true,
    default: "I",
  },
});

const Users = mongoose.model('Users', UsersSchema);
export default Users;