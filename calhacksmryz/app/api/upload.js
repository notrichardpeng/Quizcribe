// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({ dest: './public/uploads/' });

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
    console.log(req.file);
    res.status(200).json({ data: 'File uploaded successfully.' });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
