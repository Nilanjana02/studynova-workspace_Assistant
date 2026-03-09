// import mongoose from "mongoose";
// const connectDB = async()=>{
//    mongoose.connection.on('connected',()=>console.log("mongoDB connected"));
//    await mongoose.connect(`${process.env.MONGODB_URL}/Login_full_app`);
// }
// export default connectDB ;
 import mongoose from "mongoose";

const connectDB = async () => {
   mongoose.connection.on('connected', () =>
      console.log("MongoDB Connected Successfully")
   );

   await mongoose.connect(process.env.MONGODB_URL);
};

export default connectDB;