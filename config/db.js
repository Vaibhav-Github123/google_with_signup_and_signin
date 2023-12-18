const mongoose = require("mongoose")

const dburl = process.env.MONGO_URI

mongoose.connect(dburl).then(()=>{
    console.log("DB connected success...");
}).catch((err)=>{
    console.log(err);
})