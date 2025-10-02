const express = require('express');
const authMiddleware = require('../middlewares/authe')

const fs = require('fs');

const path = require('path');
const router = express.Router();
const upload = require('../config/multer.config')
const fileModel = require('../models/files.models')


const uploadDir = path.join(__dirname, '../uploads');


router.get('/home', authMiddleware, async (req,res) => {
    
  try{


    const userFiles = await fileModel.find({
      user: req.user.userId
    })
    
    console.log(userFiles)

    
    res.render('home', {
      files: userFiles
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    })
  }

})

router.post('/upload', authMiddleware, upload.single('file'), async (req,res)=> {

    const newFile = await fileModel.create({
      path: req.file.path,
      originalname: req.file.originalname,
      user: req.user.userId

    })

    res.json(newFile)
} );

router.get('/download/:id', authMiddleware, async (req,res) => {

    const loggedInUserId = req.user.userId;
    const id = req.params.id;

    const file = await fileModel.findOne({
      user: loggedInUserId,
      _id: id
    })

    if(!file) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    res.download(file.path, file.originalname);
})


module.exports = router;