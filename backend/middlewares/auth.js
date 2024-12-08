const jwt=require('jsonwebtoken')


const protect=(req,res,next)=>{
    // Extract token from request
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'No token authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        req.user = decoded.userId;  
        next();  
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }

}


module.exports=protect






// now let us understand middlewares mkc
// Middleware jo hotee hain unke paas req object res object and next function of request response cycle of application
// Middleware functions are used to:

// Perform actions on requests (e.g., logging, authentication)
// Modify the request or response
// Pass control to the next middleware function



// A middleware function can either:

// Perform some action and pass control to the next middleware by calling next()
// Send a response directly (without calling next()) to end the request-response cycle


// express mein jiss order mein middleware likhe hain ussi order mein execute hotee hain




// Middlewares used till now

// 1.) express.json() -> jitna bhi json data aata hai usse objects mein parse karr deta hai
// 2.) protect-> custom authentication middleware hai jo maine banaya hai and ye unauthorized access se bachata hai 



// Middleware Flow in Your App:
// Request comes in: The request hits the server.
// Body Parser Middleware: If there’s JSON data in the request, express.json() parses it and makes it available in req.body.
// Authentication Middleware (protect): If the route is protected, the protect middleware checks for a valid token and adds req.user.
// Route Handler: If everything is good, the route handler (e.g., router.post('/api/notes')) runs, using data from req.body and req.user.
// Error Handling: If something goes wrong, the error handler middleware catches the error and sends a response.






// pehli important baat 
// signup krte hue main hmesha token bhejta hu and harr baar jab bhii main request karta hu server se to vo token saath jaata hai and usse mujhe authorization milta hai 
// Chaloo main baat to khtm hi bhai ab frontend prr chalte hain
