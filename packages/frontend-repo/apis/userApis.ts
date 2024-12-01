import { db } from "./firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { UserProps } from "../types/interface";

export const fetchUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // User data found
  } else {
    throw new Error("No user data found"); // No such document
  }
};

export const fetchAllUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    if (querySnapshot.empty) {
      return [];
    }

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const editUsers = async (data: UserProps, id: string) => {
  try {
    const userRef = doc(db, "users", id);

    // Get the current document data to check if the user exists
    const userDoc = await getDoc(userRef);

    // If the user document doesn't exist, throw an error
    if (!userDoc.exists()) {
      console.log("User not found!");
      return;
    }

    // Update the document with the new data
    await updateDoc(userRef, data);
  } catch (error) {
    throw error;
  }
};
