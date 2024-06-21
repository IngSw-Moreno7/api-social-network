import {Schema, model} from "mongoose";

const UserSchema = Schema ({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  nick: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: "role_user"
  },
  image: {
    type: String,
    required: "default.png"
  },
  created_at: {
    type: Date,
    required: Date.now
  }
});

export default model("User", UserSchema, "users");