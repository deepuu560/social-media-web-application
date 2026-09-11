import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import { uploadImage } from "./uploadService";
import { createNotification } from "./notificationService";

const postsRef = collection(db, "posts");

// =======================================
// CREATE POST
// =======================================

export async function createPost(user, text, imageFile = null) {
  let image = "";

  if (imageFile) {
    image = await uploadImage(imageFile);
  }

  await addDoc(postsRef, {
    uid: user.uid,
    name: user.displayName || user.email.split("@")[0],
    email: user.email,
    text,
    image,
    likes: [],
    reposts: [],
    createdAt: serverTimestamp(),
  });
}

// =======================================
// REALTIME POSTS
// =======================================

export function subscribeToPosts(callback) {
  const q = query(postsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}

// =======================================
// DELETE POST
// =======================================

export async function deletePost(id) {
  await deleteDoc(doc(db, "posts", id));
}

// =======================================
// LIKE POST
// =======================================

export async function likePost(postId, uid) {
  const postRef = doc(db, "posts", postId);

  const snap = await getDoc(postRef);

  if (!snap.exists()) return;

  const post = snap.data();

  if (post.likes?.includes(uid)) {
    await updateDoc(postRef, {
      likes: arrayRemove(uid),
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(uid),
    });

    if (post.uid !== uid) {
      await createNotification({
        receiverId: post.uid,
        senderId: uid,
        senderName:
          auth.currentUser.displayName ||
          auth.currentUser.email.split("@")[0],
        senderPhoto: auth.currentUser.photoURL || "",
        type: "like",
        postId,
      });
    }
  }
}

// =======================================
// REPOST POST
// =======================================

export async function repostPost(postId, uid) {
  const postRef = doc(db, "posts", postId);

  const snap = await getDoc(postRef);

  if (!snap.exists()) return;

  const post = snap.data();

  if (post.reposts?.includes(uid)) {
    await updateDoc(postRef, {
      reposts: arrayRemove(uid),
    });
  } else {
    await updateDoc(postRef, {
      reposts: arrayUnion(uid),
    });

    if (post.uid !== uid) {
      await createNotification({
        receiverId: post.uid,
        senderId: uid,
        senderName:
          auth.currentUser.displayName ||
          auth.currentUser.email.split("@")[0],
        senderPhoto: auth.currentUser.photoURL || "",
        type: "repost",
        postId,
      });
    }
  }
}