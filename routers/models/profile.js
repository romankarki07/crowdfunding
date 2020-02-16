var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'public/uploaded images/');
    },
    filename: function(req, file, callback){
        callback(null, Date.now()+file.originalname);
    }
});
var upload = multer = multer({storage:storage}).single('profileImage');

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    res.json({
        success : true,
        message:"Image uploaded"
    });
    // Everything went fine.
  })
})
module.export = router;
