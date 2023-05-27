import mongoose from "mongoose";

/**
 * USER SCHEME
 */
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
})


/**
 * USER SCHEME MODEL
 */
export const UserModel = mongoose.model('user', UserSchema)

/**
 * ACTIONS - to be used by controllers
 */
// GET ALL
export const getUsers =  () => UserModel.find();
// GET USER BY EMAIL
export const getUserByEmail =  (email: string) => UserModel.findOne({ email });
// GET USER BY SESSION TOKEN - to know if user is logged in
export const getUserBySessionToken =  (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
// GET USER BY ID
export const getUserById =  (id: string) => UserModel.findById(id);
// CREATE USER
export const createUser =  (values: Record<string, any>) => new UserModel(values).save().then(u=>u.toObject());
// DELETE USER
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
// UPDATE USER
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
