import path from 'path';
import fs from 'fs';

import IStorageProvider from "../models/IStorageProvider";

import uploadConfig from "@config/upload";

export default class DiskStorageProvider implements IStorageProvider {
    public async saveFiles(files: string[]): Promise<string[]> {
        files.map(async file => {
            await fs.promises.rename(
                path.resolve(uploadConfig.multer.tmpFolder, file),
                path.resolve(uploadConfig.multer.uploadFolder, file),
            );
        })

        return files;
    }

    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.multer.tmpFolder, file),
            path.resolve(uploadConfig.multer.uploadFolder, file),
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.multer.uploadFolder, file);

        try {
            await fs.promises.stat(filePath);
        }catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}