import { Schema, model } from "mongoose";

const AppointmentSchema = Schema(
    {
        pet: {
            type: Schema.Types.ObjectId,
            ref: "Pet",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Pendiente", "Confirmado", "Cancelado"],
            default: "Pendiente"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        description:{
            type: String,
            required: true,
            maxLength: [100, "Cant be overcome 100 characters"]
        }
    },
    {
        timestamps: true
    }

    
);

AppointmentSchema.methods.toJSON = function() {
    const { __v, _id, ...appointment } = this.toObject();
    appointment.uid = _id;
    return appointment;
}

export default model("Appointment", AppointmentSchema);