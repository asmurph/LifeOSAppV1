// src/services/authService.js (Create this new file)
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signupUser = async (email, password, username) => {
  try {
    // 1. Firebase Authentication: Create user
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const userId = response.user.uid;

    // 2. Firestore: Create user profile document
    await setDoc(doc(db, "users", userId), {
      uid: userId,
      email: email,
      username: username,
      role: "standard", // Example of a default field
      createdAt: new Date(),
    });

    return { success: true, user: response.user };
  } catch (error) {
    console.error("Sign up error:", error.code, error.message);
    
    // Provide a user-friendly error message
    let errorMessage = "An unknown error occurred during sign-up.";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "This email is already registered.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "The email address is not valid.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "The password must be at least 6 characters long.";
    }

    return { success: false, error: errorMessage };
  }
};