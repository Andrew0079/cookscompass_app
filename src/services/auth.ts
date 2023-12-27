import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Check if user is created successfully
    if (userCredential.user) {
      // Update the user's profile with the username
      await updateProfile(userCredential.user, { displayName: username });

      // Reload user to ensure displayName is updated
      await userCredential.user.reload();

      // User object after reload
      const updatedUser = userCredential.user;

      // Send email verification
      await emailVerification();

      // Return the updated user's information
      return updatedUser;
    }
  } catch (error) {
    throw error;
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

const emailVerification = async () => {
  try {
    const user = auth.currentUser;
    await sendEmailVerification(user);
  } catch (error) {
    throw error;
  }
};

export { signUp, signIn, signOut, emailVerification };
