require('./db.js');
require('./config/passport-config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
var passport = require('passport');

//Import Routes
const assignhospitalRoute = require('./routes/assignhospital.server.routes');
const userRoute = require('./routes/addRm.server.routes');
const designationRoute = require('./routes/addDesignation.server.routes');
const loginRoute = require('./routes/login.server.routes');
const applicationRoute = require('./routes/application.server.routes');
const commonRoute = require('./routes/common.server.routes');
const leadRoute = require('./routes/leads.server.routes');
const claimRoute = require('./routes/claim.server.routes');
const effortRoute = require('./routes/effort.server.routes');
const leaderShipRoute = require('./routes/leadershipBoard.server.routes');

var app = express();

app.use(cors());
app.use(express.json({limit: '200mb'}));
//app.use(express.bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

app.use(passport.initialize());

app.use('/rmapi', loginRoute ,applicationRoute,designationRoute,userRoute,assignhospitalRoute,commonRoute,leadRoute,claimRoute,effortRoute,leaderShipRoute)


//Port Listening
app.listen(4000, () => {
    console.log("Server started at port : 4000");
});