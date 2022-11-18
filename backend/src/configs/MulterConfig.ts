import multer from "multer";
import multerS3 from "multer-s3";
import Overall from "./Overall";

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage(
    {
    destination: (req, res, cb) => {
        cb(null, '/tmp')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const multerS3Config = multerS3(
    {
    s3: Overall.settupS3,
    bucket: process.env.BUCKET_NAME ||  "imagesbxf",
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

export default upload;