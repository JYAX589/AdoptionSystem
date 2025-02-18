import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet, updatePet } from "./pet.controller.js";
import { createAppointment, getCite, deleteCite } from "./pet.addpointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo válido').not().isEmpty(),
        validarCampos
    ],
    savePet
);

router.get('/', getPets);

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    searchPet
);

router.delete(
    '/:id',
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deletePet
);

router.put(
    '/:id',
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    updatePet
);

// Rutas para citas
router.post(
    '/appointment',
    [
        validarJWT,
        check('petId', 'ID de mascota inválido').isMongoId(),
        check('description', 'La descripción es requerida').not().isEmpty(),
        check('date', 'La fecha es requerida').isISO8601(),
        check('time', 'La hora es requerida').not().isEmpty(),
        validarCampos
    ],
    createAppointment
);

router.get(
    '/appointment',
    [
        validarJWT,
        validarCampos
    ],
    getCite
);

router.delete(
    '/appointment/:id',
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deleteCite
);

export default router;
