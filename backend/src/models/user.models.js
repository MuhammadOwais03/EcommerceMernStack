import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: 'String',
        required: true,
        unique: true,
    },
    name: {
        type: 'String',
        required: true,
    },
    password: {
        type: 'String',
        required: true,
    },
    refreshToken: {
        type: 'String',
        default: null,
    },
    userRole: {
        type: 'String',
        required: true,
    },
    cartData: {
        type: Object,
        default: {},
    },
}, { minimize: false, timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;