import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

class MongoDBConnection {
    
    constructor() {
        const connectionString = process.env.MONGODB_STRING;
        if(!connectionString) throw new Error("Missing env variable");

        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        this.db = mongoose.connection;

        this.db.once('open', () => {
            this.gfs = new GridFSBucket(this.db.db, { bucketName: 'photos' });
        })
    }
}

const mongoConnection = new MongoDBConnection()

export default mongoConnection
