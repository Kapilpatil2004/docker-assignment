const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", async (req, res) => {
    try {
        console.log("Data received:", req.body);

        const params = new URLSearchParams();
        params.append("name", req.body.name);
        params.append("password", req.body.password);

        const response = await axios.post(
            "http://backend:5000/submit",
            params.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        res.send(`
            <h1>${response.data.message}</h1>
            <p>Name: ${response.data.data.name}</p>
            <a href="/">Go Back</a>
        `);

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Could not connect to Flask backend.");
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on http://localhost:${PORT}`);
});