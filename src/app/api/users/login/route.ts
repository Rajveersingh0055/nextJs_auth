import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { use } from "react";
import  jwt  from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        // Ensure the request is a POST request
        const reqbody = await req.json();

        // Validate the request body
        const {email, password} = reqbody;

        // Check if email and password are provided
      const user = await User.findOne({email})

      // If user is not found, return an error
      if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
      }

      // Check if the password is correct
      const validPassword = await bcryptjs.compare(password, user.password);
        // If the password is incorrect, return an error
      if (!validPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }

      //create a session or token here if needed
      // For simplicity, we are not implementing session management in this example
      const tokenData = {
        _id: user._id,
        email: user.email,
        username: user.username,
        // Add any other user data you want to include in the token
      }

      //create a JWT token here
      // Use a secret key from environment variables for signing the token
      // Set an expiration time for the token
      // Ensure you have a TOKEN_SECRET in your .env file
      // Use the jwt library to sign the token
      // Return the token in the response
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      // Set the token in a cookie or return it in the response
      // Here we are setting the token in a cookie
      const response = NextResponse.json({ message: "Login successful",
        success: true,
      }, { status: 200 });
      
        // Set the token in a cookie
        // Ensure the cookie is HTTP-only for security
        // You can also set other cookie options like secure, sameSite, etc.
        // Here we are setting the token in a cookie
      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response
   
    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
        
    }
}