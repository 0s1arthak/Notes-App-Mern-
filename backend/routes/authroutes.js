const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is included if you're manually hashing passwords
const User = require('../models/User');

app.use(express.json());
const router = express.Router();

// Sign up route
router.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Credentials are not right" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password // Assuming you're hashing the password in a Mongoose pre-save hook
        });

        // Generate a JWT token
        const token = jwt.sign(
            { userId: newUser._id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1h" }     // Token expires in 1 hour
        );

        // Return user data and token
        res.status(201).json({
            message: "User created successfully",
            data: newUser,
            token // Token included in response
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

// Login route
router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Credentials are not right" });
        } else {
            const person = await User.findOne({ email: email });
            if (!person) {
                return res.status(400).json({ message: "User does not exist" });
            }

            const isMatch = await person.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: "Password is incorrect" });
            }

            const token = jwt.sign(
                { userId: person._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                message: 'User logged in successfully',
                token, // Send token to the client
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error logging in user" });
    }
});

module.exports = router;





// Dekhh bhai baat aisi hai jb main real world mein ek project banata hu for example amazon to ab bohot saare aise logg ho sakte hain
// jinki same orderlist aurr wishlist hai aurr maanle maine koi api banayi jo fetch krke laati products to ab mujhe ensure karna pdhega 
// ki main apni hi id waale orderlist access kruuu
// Maine iss project mein yahi kiyaa hai jo api banayi hai na vo maine id specific banayi to koi bhi user jo logged in nahi bhi hai vo api
// parr jakarr notes ko fetch krke kuch bhi krr sakta bina log in kiyaa notes add karr sakta hai delete kiyaa to meri application ka faayeda hi nahi hua



// Haa to isse deal krne k liyee main 2 cheezei krungaa 
// sabse pehla apni notes waale schema mein user se notes ko link krr dungaa 
// dusra kaam ye hai jb bhii main koi get route access krunga notes ko fetch krne k liyee hmesha main ek middleware lagaunga jo bass ye check krega 
// ki mere paas token hai ya nahii agar hoga to bohot bdhiya tum access krr sakte ho nahi hai to maa chudaa randi k bacche pehle log in krr sign upp krr bsdk
