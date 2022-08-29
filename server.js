const app = require("./app");
const { default: mongoose } = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        throw error;
    }
};
connectDB();

app.listen(process.env.PORT || 4001, ()=> {
    console.log("server is live at "+ process.env.PORT)
});

module.exports = app;