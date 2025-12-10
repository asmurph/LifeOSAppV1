    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getFirestore, doc, setDoc } from "firebase/firestore";


    const TestSignup = () => {
    const auth = getAuth();
    const db = getFirestore();

        async function registerUser(email, password, displayName) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: displayName,
          createdAt: new Date(),
          // Add any other desired user data
        });

        console.log("User registered successfully:", user);
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
    }

    // Example usage:
    registerUser("newuser@example.com", "strongpassword123", "John Doe");
    };

export default TestSignup;