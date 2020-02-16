var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var routerData = require('./homeroutes');
var multer = require('multer');
var upload = multer({dest: './public/uploads/'});
router.get('/', routerData.homePage);
router.get('/signup', routerData.signupPage);
router.get('/create-project', routerData.createProject);
// router.get('/:bid', routerData.projectDetails);
router.get('/login', routerData.loginPage);
router.get('/projectdetails/:id', routerData.singleDetails);
router.get('/checkpayment/:id/:amount/:paymentid', routerData.payinvent);

// router.post('/:bid', routerData.userComment);
router.post('/submit', routerData.postSignup);
router.get('/logout', (req, res)=> {
    req.session.destroy()
    res.redirect('/')
})
router.post('/login', routerData.checkLogin, routerData.nextCheck);

router.post('/project', upload.any(), routerData.postProject);
router.get('/project', routerData.getProject);
module.exports = router;