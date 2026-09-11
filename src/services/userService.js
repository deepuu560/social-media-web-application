import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

// ==========================
// USERS COLLECTION
// ==========================

const usersCollection = collection(db, "users");

// ==========================
// CREATE USER
// ==========================

export async function createUser(user) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    username: user.username,
    email: user.email,

    bio: "",
    location: "",
    website: "",

    photoURL: "",
    coverURL: "",

    followers: [],
    following: [],

    joinedAt: serverTimestamp(),
  });
}

// ==========================
// GET ONE USER
// ==========================

export async function getUser(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// ==========================
// GET ALL USERS
// ==========================

export async function getUsers() {
  const snapshot = await getDocs(usersCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ==========================
// UPDATE USER
// ==========================

export async function updateUser(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}

// ==========================
// SEARCH USERS
// ==========================

export async function searchUsers(searchText) {
  const users = await getUsers();

  if (!searchText) return users;

  const query = searchText.toLowerCase();

  return users.filter((user) => {
    return (
      user.displayName?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}