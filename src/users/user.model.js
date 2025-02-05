import {Schema, model} from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name in required'],
        maxLenght: [25, 'cant be overcome 25 characters']
    },
    surname:{
        type: String,
        required: [true, "apellido es requerido"],
        maxLenght: [25, "No puede sobrepasar los 25 caracteres"]
    },
    username:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasenia es obligatoria']
    },
    profilePicture: {
        type: String
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default model('User', UserSchema);