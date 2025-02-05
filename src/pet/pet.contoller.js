import User from '../users/user.model.js'
import Pet from './pet.model.js'

export const savePet = async (req, res)=> {
    try {
      const data = req.body;
      const user = await User.findOne({email: data.email});

      if (!user){
        return res.status(404).json({
            succerss: false,
            message: 'propietario no encotrado '
        })
      }

      const pet  = new Pet({
        ...data,
        keeper: user._id
      });

      await pet.save();

      res.status(200).json({
        succers:true,
        pet
      })
      
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'error al guardar mascota',
            error
        })
        
    }
}

export const getPets = async (req, res)=>{
    const{limite = 10, desde = 0} = req.query;

    const query = {status: true};
    try {
        const pets = await Pet.find(query)
        . skip(Number(desde)).limit(Numer(limite));

        const petWithOwnerNames = await Promise.all(pets.map(async(pet)=>{
            const owner = await User.findById(pet.keeper);
            return{
                ...pet.toObject(),
                    keeper: owner? owner.nombre: 'propietario no encotrado'
                
            }
        }));

        const total = await Pet.conutDocuments(query);
        res.status(200).json({
            success: true,
            total,
            pets: petWithOwnerNames
        });
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message: 'error al obtener  mascotas',
            error
        })
        
    }
}

export const searchPet = async (req, res) =>{
    const {id} = req.params;
    try {
        const pet = await pet.findById(id);
        if(!pet){
            return res.status(404).json({
                success: false,
                message:'mascota no encontrada'
            })
        }

        const owner = await User.findById(pet.keeper);
        res.tatus(200).json({
            success:true,
            pet:{
                ...pet.toObject(),
                keeper: owner? owner.nombre: 'propietario no encontrado'
            }
        })

    } catch (error) {
        res.status(500).json({
            succees:false,
            message: 'error al buscar mascota',
            error
        })
        
    }
}

export const deletePet = async (req, res) =>{
    const {id} = req.params;

    try {
        await Pet.findByIdAndUpdate(id, {status: false});
        res.status(200).json({
            success:true,
            message: 'mascota eliminada'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al eliminar mascota',
            error
        })
    }
}