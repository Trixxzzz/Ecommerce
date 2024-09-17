import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB file size limit

const upload = multer({ storage, fileFilter, limits });
const uploadSingleImage = upload.single("image");

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle multer-specific errors
            res.status(400).send({ message: `Multer Error: ${err.message}` });
        } else if (err) {
            // Handle other errors
            res.status(400).send({ message: `Error: ${err.message}` });
        } else if (req.file) {
            res.status(200).send({
                message: "File Uploaded Successfully",
                image: `/${req.file.path}`
            });
        } else {
            res.status(400).send({ message: "No File Uploaded" });
        }
    });
});

export default router;
