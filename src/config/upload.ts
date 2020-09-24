import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
    multer: {
        tempFolder: tmpFolder,
        uploadFolder: uploadFolder,

        storage: multer.diskStorage({
            filename(request, file, callback) {
                const filehash = crypto.randomBytes(10).toString('hex');
                const filename = `${filehash}-${file.originalname.split(' ').join('-')}`

                return callback(null, filename);
            }
        })
    }
}