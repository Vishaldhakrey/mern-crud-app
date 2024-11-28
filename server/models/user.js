const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
});

const User = mongoose.model("user", userSchema);

module.exports = User;