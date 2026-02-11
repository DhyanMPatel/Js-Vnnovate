import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(import.meta.dirname, "..", "files");

        if(!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

export { upload };