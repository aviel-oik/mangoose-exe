import express from "express";
import cors from "cors";
import { connectDB } from "./connect.js";
import User from "./models/user.js";

const app = express();
app.use(cors());
app.use(express.json());

await connectDB(); // connection MongoDB avant routes

app.post("/add-user", async (req, res) => {
    try {
        const newEmail = "le2@gmail.com"
        const { name, email } = req.body;
        const user = new User({name, email: newEmail})
        const user1 = new User({ name, email })
        await user.save()
        await user1.save()
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add user" });
    }   
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({name:"re"});
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.listen(8000, () => console.log("Server running on port 8000"));



