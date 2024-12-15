const express=require('express')
const app=express();
const protect=require(`../middlewares/auth`)
// Fetch Note instance from Notes.js of models
const Note = require(`../models/Notes`)
app.use(express.json());
const router=express.Router()


// post 
router.post('/api/notes',protect,async (req,res)=>{
    try {
        const {title,content}=req.body;
        if(!title || !content){
            return res.status(400).json({error:'title and content are required'})
        }
        const newNote = await Note.create({
            title,
            content,
            user: req.user ,  
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating note" });
    }

})




router.get('/api/getNotes',protect,async (req,res)=>{
    try {
        const notes = await Note.find({ user: req.user});  // Fetch notes for the logged-in user
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error in fetching the notes"});
    }
})



router.put('/api/notes/:id',protect,async(req,res)=>{
    try {
        const {title,content}=req.body;
        if(!title || !content){
            return res.status(400).json({message:"Please send correct data"});
        }
        console.log(req.params);
        const id=req.params.id;
        const note = await Note.findOne({ _id: id, user: req.user });
        if (!note) {
          return res.status(404).json({ message: "Note not found or access denied" });
        }
    
        // Update the note
        note.title = title;
        note.content = content;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in updating code" });
        
    }
})








module.exports = router;