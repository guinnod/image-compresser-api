const express = require("express");
const fileParser = require("express-multipart-file-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const compressImage = require("./utils");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileParser);

app.post("/", async (req, res) => {
    const image = req.files[0];
    const maxSize = req.query.max;
    const { buffer } = image;
    const result = await compressImage(buffer, maxSize);
    res.set("Content-Type", image.mimetype);
    res.send(result);
});

app.listen(5000, () => {
    console.log("Server started");
});
