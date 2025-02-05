import {Router} from 'express'
import { check } from 'express-validator'
import { savePet, getPets, searchPet, deletePet } from './pet.contoller.js'
import {validarCampos} from '../middlewares/validar-campos.js'
import {validarJWT} from '../middlewares/validar-jwt.js'



const router = Router();

router.post(
    '/',
    [
        validarJWT,
        check('email', 'este no es un correo valido').not().isEmpty(),
        validarCampos

    ],
    savePet
)

router.get('/', getPets)

router.get('/:id',
    [
        validarJWT,
        check('id', 'no es valido el id').isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    '/:id',
    [
        validarJWT,
        check('id','no es valido').isMongoId(),
        validarCampos
    ],
    deletePet
)




export default router;