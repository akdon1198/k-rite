const router = require("express").Router()
const Checklistmodel = require("../model/Checklistmodel")

router.post("/addchecklist", async (req, res) =>{
    const {priority, name, duedate, createdAt, description, userid, markedval} = req.body
    try{
        const checklist = new Checklistmodel({priority, name, createdAt, markedval, duedate, description, userid})
        const newchecklist = await checklist.save()
        res.json({
            newchecklist
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

router.get("/getchecklist/:id", async (req, res) =>{
    const {id} = req.params
    const {time} = req.query
    try{
        if(time == "all"){
            const allchecklist = await Checklistmodel.find({userid : id})
            return res.json({
                allchecklist
            })
        }
        const allchecklist = await Checklistmodel.find({userid : id, createdAt : time})
        res.json({
            allchecklist
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

router.delete("/deletechecklist/:id", async (req, res) =>{
    const {id} = req.params
    try{
        const deletedchecklist = await Checklistmodel.findByIdAndDelete(id)
        res.json({
            deletedchecklist
        })
    }catch(err){    
        res.json({
            message : "something went wrong"
        })
    }
})

router.patch("/updatechecklist/:id", async (req, res) =>{
    const {id} = req.params
    const {priority, name, duedate, description, markedval} = req.body
    try{
        if(priority){
            const updatedchecklist = await Checklistmodel.findByIdAndUpdate(id, {
                priority, name, duedate, description
            })
            return res.json({
                updatedchecklist
            })
        }
        const updatedchecklist = await Checklistmodel.findByIdAndUpdate(id, {markedval})
        return res.json({
            updatedchecklist
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

router.get("/getsinglechecklist/:id", async (req, res) =>{
    const {id} = req.params
    try{
        const singlechecklist = await Checklistmodel.findById(id)
        res.json({
            singlechecklist
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})
module.exports = router