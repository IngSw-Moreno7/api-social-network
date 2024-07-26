import { Router } from 'express';
const router = Router();
import { testPublication, savePublication, showPublication, deletePublication, publicationsUser, uploadMedia, showMedia, feed } from '../controllers/publications.js';
import { ensureAuth } from '../middlewares/auth.js';
import multer from "multer";
import Publication from '../models/publication.js';


// Configuración de subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/publications/");
  },
  filename: (req, file, cb) => {
    cb(null, "pub-"+Date.now()+"-"+file.originalname);
  }
});

// Middleware para subida de archivos
const uploads = multer({storage});

router.get('/test-publication', testPublication);
router.post('/new-publication', ensureAuth, savePublication);
router.get('/show-publication/:id', ensureAuth, showPublication);
router.delete('/delete-publication/:id', ensureAuth, deletePublication);
router.get('/publications-user/:id/:page?', ensureAuth, publicationsUser);
router.post('/upload-media/:id', [ensureAuth, uploads.single("file0")], uploadMedia);
router.get('/media/:file', showMedia);
router.get('/feed/:page?', ensureAuth, feed);


export default router;
