

import mongoose from "mongoose";


const connectToDb=()=>{



mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

}

export default connectToDb