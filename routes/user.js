// Importaciones
import { Router } from "express";
const router = Router();
import { register, testUser, login, profile, listUsers, updateUser } from "../controllers/user.js";
import { ensureAuth } from "../middlewares/auth.js"; 

// Definir las rutas
router.get('/test-user', ensureAuth, testUser);
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', ensureAuth, profile);
router.get('/list/:page?', ensureAuth, listUsers);
router.put('/update', ensureAuth, updateUser);


// Exportar el router
export default router;
