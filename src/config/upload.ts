import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    link: process.env.UPLOAD_LINK,

    multer: {
        tmpFolder: tmpFolder,
        uploadFolder: path.resolve(tmpFolder, 'uploads'), 
        
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const filehash = crypto.randomBytes(10).toString('hex');
                const filename = `${filehash}-${file.originalname.split(' ').join('-')}`

                return callback(null, filename);
            }
        })
    }
}