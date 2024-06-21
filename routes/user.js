//Importaciones
import { Router } from "express";
const router = Router();
import { register, testUser, login } from "../controllers/user.js";

//Definir las rutas
router.get('/test-user', testUser);
router.post('/register', register);
router.post('/login', login);

//Exportar el router
export default router;
