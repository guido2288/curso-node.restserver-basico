
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');


const { esRolValido, mailValido,existeUsuarioPorId } = require('../helpers/dbValidators');

const { validarCampos, validarJWT, tieneRol, esAdminRol } = require('../middlewares');

const router = Router();


router.get('/' , usuariosGet);

router.put('/:id', 
    [ 
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRolValido ),
        validarCampos
    ],
     usuariosPut);

router.post('/', [ 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6 }),
    check('correo').custom( mailValido ),
    //check('rol', 'No es un rol permitido').isIn([ 'ADMIN_ROLE','USER_ROLE' ]),
    check('rol').custom( esRolValido ),
    validarCampos

 ] , usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);






module.exports = router;

