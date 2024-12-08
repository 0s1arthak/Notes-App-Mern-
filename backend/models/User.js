const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

// hashing the password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        // agar ye modified nahi hua to skip hashing
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})



// jab main already registered hu to mujhe iss waale method ki need pdhegi agar main log in karr raha hu to koi need nahi hai 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);  
};



module.exports=mongoose.model("User",userSchema)

