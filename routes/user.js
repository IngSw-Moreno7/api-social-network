//Importaciones
import { Router } from "express";
const router = Router();
import { register, testUser } from "../controllers/user.js";

//Definir las rutas
router.get('/test-user', testUser);
router.post('/register', register);

//Exportar el router
export default router;
