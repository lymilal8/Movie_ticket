const express = require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const movieData = require('../model/movieData');

//GET

router.get('/getdata/:token',async(req,res)=>{
    let data=await movieData.find();
    try {
       jwt.verify(req.params.token,"ict",
       (error,decoded)=>{
        if(decoded && decoded.email){
            res.json(data);
        }else{
            res.json({message:"Unauthorised user"})
        }
       })
    }
    catch (err) {
        res.status(404).send('Data not found');
        console.log(err);
    }
})

//POST

router.post('/postdata',async(req,res)=>{
    try {
        const item=req.body;
        const newData= movieData(item);
        jwt.verify(req.body.token,"ict",
        (error,decoded)=>{
            if(decoded && decoded.email){
                newData.save();
                res.json({message:"movie added successfully"}); 
            }else{
                res.json({message:"Unauthorised user"});
            }

        }
        )
    }
    catch (err) {
        res.json({message:"Unable to add"});
        console.log(err);
    }
})


router.put('/edit/:id',async (req, res) =>{
    try {
        const item=req.body;
        const postid=req.params.id;
        console.log(postid);
       
        const updatedPut=await movieData.findByIdAndUpdate(postid,item);
        res.json({message:"Updated Successfully"});
    }
    catch (err) {
        
        console.log(err.message);
        res.status(400).json({message:"Unable to update"});
    }

});

//delete

router.delete('/delete/:_id',async  (req, res) =>{
    try {
        const empID=req.params._id;
        console.log(empID);
        const deletePost=await movieData.findByIdAndDelete(empID);
        console.log("deletePost");
        res.json({message:"Movie deletion successfull"});

    }
    catch (err) {
        res.status(404).json('unable to delete movie');
        console.log(err);
    }

})
module.exports=router;
