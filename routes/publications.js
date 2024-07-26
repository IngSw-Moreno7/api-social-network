//Importaciones
import { Router } from 'express';
const router = Router();
import { testPublication, savePublication, showPublication } from '../controllers/publications.js';
import { ensureAuth } from '../middlewares/auth.js';

//Definir las rutas
router.get('/test-publication', testPublication);
router.post('/publication', ensureAuth, savePublication);
router.get('/show-publication/:id', ensureAuth, showPublication);

//Exportar el router
export default router;
