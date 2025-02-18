import Pet from './pet.model.js';
import Appointment from './pet.model.appointment.js';

export const createAppointment = async (req, res) => {
    try {
        const { petId, description, date, time } = req.body;
        const userId = req.usuario._id;

        // Verificar que la mascota existe
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({
                success: false,
                message: 'Mascota no encontrada'
            });
        }

        // Crear la cita
        const appointment = new Appointment({
            description,
            date,
            time,
            petName: pet.name,
            pet: petId,
            owner: userId
        });

        await appointment.save();

        res.status(201).json({
            success: true,
            appointment
        });

    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear la cita',
            error: error.message 
        });
    }
};

export const getCite = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const citas = await Appointment.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('pet')
            .populate('owner');

        const citasFormateadas = citas.map((cita) => {
            return {
                ...cita.toObject(),
                pet: cita.pet ? cita.pet : "Mascota no encontrada",
                owner: cita.owner ? cita.owner.nombre : "Dueño no encontrado"
            };
        });

        res.status(200).json({
            success: true,
            citas: citasFormateadas
        });
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las citas',
            error: error.message
        });
    }
};

export const deleteCite = async (req, res) => {
    const { id } = req.params;
    try {
        const cita = await Appointment.findByIdAndDelete(id);
        if (!cita) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Cita eliminada correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la cita',
            error: error.message
        });
    }
};