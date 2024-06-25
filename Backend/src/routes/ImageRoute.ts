import express from 'express';
import multer from 'multer';
import path from 'path';
import ImageController from '../controllers/ImageController';
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.get('/:id', ImageController.getImageById);
router.post('/', upload.single('file'), ImageController.uploadImage);
export default router;
