let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;
//
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

mongoose.connect(
    'mongodb+srv://ntorbev:17Zq8TimCRDCbblm@cluster0-7mibb.mongodb.net/test',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
).then(() => {
    console.log("Connected to database!");
}).catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Content-type","text/hml"
    );
    next();
});
app.use("/api/user", userRoutes);
//
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

module.exports = app;