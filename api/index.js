const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

const port = process.env.PORT || 8000;


// Connect to MongoDB
mongoose.connect('mongodb+srv://ritesh:ritesh@cluster0.gdxgf3w.mongodb.net/?retryWrites=true&w=majority')
    .then(console.log('Connected to database!'))
    .catch((err) => { console.log(err) });

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {

    try {
        return res.status(200).json("File uploaded");

    } catch (error) {
        console.log(error);
    }


});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}
);






