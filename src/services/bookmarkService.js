import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

const bookmarksRef = collection(db, "bookmarks");

// ==========================
// Add Bookmark
// ==========================
export async function addBookmark(uid, postId) {
  const q = query(
    bookmarksRef,
    where("uid", "==", uid),
    where("postId", "==", postId)
  );

  const snap = await getDocs(q);

  if (!snap.empty) return;

  await addDoc(bookmarksRef, {
    uid,
    postId,
  });
}

// ==========================
// Remove Bookmark
// ==========================
export async function removeBookmark(uid, postId) {
  const q = query(
    bookmarksRef,
    where("uid", "==", uid),
    where("postId", "==", postId)
  );

  const snap = await getDocs(q);

  snap.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
}

// ==========================
// Toggle Bookmark
// ==========================
export async function toggleBookmark(uid, postId) {
  const q = query(
    bookmarksRef,
    where("uid", "==", uid),
    where("postId", "==", postId)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    await addBookmark(uid, postId);
  } else {
    await removeBookmark(uid, postId);
  }
}

// ==========================
// Listen to My Bookmarks
// ==========================
export function subscribeToBookmarks(uid, callback) {
  const q = query(
    bookmarksRef,
    where("uid", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}