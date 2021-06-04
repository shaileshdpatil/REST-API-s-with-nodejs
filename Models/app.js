const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("./db.js");
const bcrypt = require("bcryptjs");

//schema
const UserData = require("./Schema/userSchema");
const userData = require("./Schema/userSchema");


app.use(express.json());


app.get('/shailu', (req, res) => {
    res.send("hello shailesh");
});

app.post('/api/insertUser', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        let useremail = await UserData.findOne({ email });
        if (useremail) {

            res.status(400).json("email already exist");
        }
        const user = new UserData({
            name, email, phone, password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).json("successfully registered");

    } catch {
        res.status(400).json("Server error");
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await UserData.findOne({ email });
        if (!userLogin) {
            res.status(400).json("envalid email");
        }
        const checkpassword = await bcrypt.compare(password, userLogin.password);
        if (!checkpassword) {
            res.status(400).json("envalid password");
        } else {
            res.status(200).json("user login successfully.");
        }
    } catch {
        res.status(400).json("Server error");
    }
})

app.delete("/api/deleteuser/:id", async (req, res) => {
    try {
        const deleteuser = await UserData.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            res.status(400).json(deleteuser);
        }
        res.status(400).json("successfully deleted");
    } catch {
        res.status(200).json("server error");
    }
})

app.put("/api/updateuser/:id", async (req, res) => {

    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const phone = req.body.phone
        userData.findByIdAndUpdate({ _id: id }, { name, email, phone });
        res.status(400).json(updateuser);
    } catch {
        res.status(200).json("server error");
    }
})

app.listen(port, () => {
    console.log("server is running Now!");
});