import busboy from "busboy";
import AppError from "../AppError.js";
import mongoConnection from "../mongo.js";

export const uploadPhoto = async (req, res) => {

    const bb = busboy({ headers: req.headers });

    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const uploadStream = mongoConnection.gfs.openUploadStream(filename, { contentType: mimetype });
        
        file.pipe(uploadStream)
            .on('error', (err) => { 
                console.error(err);
                
                throw new AppError(`Internal server error: ${err.message}`, 500);
            })
            .on('finish', () => {
                res.status(201).json({ message: 'File uploaded successfully!' });
            });
    });
  
    bb.on('error', (err) => { 
        console.error(err);
        throw new AppError(`Internal server error: ${err.message}`, 500);
    });
    
    req.pipe(bb);
}

export const downloadPhoto = async (req, res) => {

    console.log(req.params.filename);

    mongoConnection.gfs
        .find({ filename: req.params.filename })
        .toArray((err, files) => {
            if(!files || files.length === 0) throw new AppError("File not found", 404)

            const downloadStream = mongoConnection.gfs.openDownloadStreamByName(req.params.filename);
            res.set('Content-Type', files[0].contentType);
            downloadStream.pipe(res);

            res.send()
        })
}