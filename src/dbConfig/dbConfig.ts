import mongoose from "mongoose";

export async function connect(){
    try {

        mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Mongodb connected successfully");
            
        })

        connection.on("error", (err) => {
        console.log("mongodb error", +err);
        process.exit()
        
        })
        
    } catch (error) {
        console.log(error);
    }
}