import AppError from "../AppError.js";

export const uploadPhoto = async (req, res) => {

    if (!req.file) {
        throw new AppError("No file uploaded or invalid file format")
    }

    res.status(201).json({ 
        message: 'File uploaded successfully',
        filePath: req.file.path.substring(8)
    });
}