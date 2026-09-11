import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import { createNotification } from "./notificationService";

// ==========================
// FOLLOW USER
// ==========================

export async function followUser(currentUid, targetUid) {
  if (currentUid === targetUid) return;

  const currentUserRef = doc(db, "users", currentUid);
  const targetUserRef = doc(db, "users", targetUid);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUid),
  });

  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUid),
  });

  // Create Notification
  const currentUserSnap = await getDoc(currentUserRef);

  if (currentUserSnap.exists()) {
    const currentUser = currentUserSnap.data();

    await createNotification({
      receiverId: targetUid,
      senderId: currentUid,
      senderName: currentUser.displayName,
      senderPhoto: currentUser.photoURL || "",
      type: "follow",
    });
  }
}

// ==========================
// UNFOLLOW USER
// ==========================

export async function unfollowUser(currentUid, targetUid) {
  if (currentUid === targetUid) return;

  const currentUserRef = doc(db, "users", currentUid);
  const targetUserRef = doc(db, "users", targetUid);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUid),
  });

  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUid),
  });
}

// ==========================
// REALTIME USER
// ==========================

export function subscribeToUser(uid, callback) {
  const userRef = doc(db, "users", uid);

  return onSnapshot(userRef, (snapshot) => {
    if (snapshot.exists()) {
      callback({
        id: snapshot.id,
        ...snapshot.data(),
      });
    }
  });
}