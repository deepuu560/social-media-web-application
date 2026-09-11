import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const commentsCollection = collection(db, "comments");

// =========================
// ADD COMMENT
// =========================
export async function addComment(commentData) {
  try {
    console.log("========== ADD COMMENT ==========");
    console.log("Comment Data:", commentData);

    const docRef = await addDoc(commentsCollection, {
      ...commentData,
      createdAt: serverTimestamp(),
    });

    console.log("Comment saved!");
    console.log("Document ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("ERROR SAVING COMMENT:", error);
    throw error;
  }
}

// =========================
// REAL TIME COMMENTS
// =========================
export function subscribeToComments(postId, callback) {
  console.log("========== COMMENT LISTENER ==========");
  console.log("Listening for Post ID:", postId);

  const q = query(
    commentsCollection,
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      console.log("Snapshot Size:", snapshot.size);

      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Comments:", comments);

      callback(comments);
    },
    (error) => {
      console.error("Snapshot Error:", error);
    }
  );
}

// =========================
// DELETE COMMENT
// =========================
export async function deleteComment(commentId) {
  await deleteDoc(doc(db, "comments", commentId));
}