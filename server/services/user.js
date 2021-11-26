const User = require('../models/User');

async function createUser(email, username, telephone, hashedPassword) {
    const user = new User({
        email,
        username,
        telephone,
        hashedPassword
    });

    await user.save();

    return user;
}

async function updateUser(id, body) {
    const user = await User.findOneAndUpdate(id, body, { safe: true, multi: true, new: true });
    await user.save();
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    if (email) {
        return await User.findOne({ email: { $regex: pattern } }).lean();
    } else {
        return false;
    }
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    if (username) {
        const user = await User.findOne({ username: { $regex: pattern } }).lean();
        return user;
    } else {
        return false;
    }
}

async function getUserByTelephone(telephone) {
    const pattern = new RegExp(`^${telephone}$`, 'i');
    if (telephone) {
        return await User.findOne({ telephone: { $regex: pattern } }).lean();
    } else {
        return false;
    }
}

async function getAllUsers() {
    let users = User.find({}).lean();
    return users;
}

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    getUserByUsername,
    getUserByTelephone,
    updateUser
};