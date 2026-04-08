import { NextFunction, Request, Response } from "express";

// Without TypeScript — you have no idea what req.body contains
// app.post('/login', (req, res) => { const email = req.body.email; ... })


function parseUserInput(input:unknown):{email:string,password:string}{

    if((typeof input!=="object") || (input==null) || !('email' in input) || !('password' in input)){
        throw new Error("Invalid input");
    }

    const {email,password} = input as {email:string,password:string}

    if(typeof email !=='string' || typeof password !=='string'){
        throw new Error("Email and password must be strings");
    }

    return {email,password}
}

const loginHandler=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const { email, password } = parseUserInput(req.body);
        // Now email and password are guaranteed to be strings
        res.json({ message: `Logging in ${email}` });
    }
    catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
} 