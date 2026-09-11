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

const notificationsRef = collection(db, "notifications");

// =======================================
// CREATE NOTIFICATION
// =======================================
export async function createNotification({
  receiverId,
  senderId,
  senderName,
  senderPhoto = "",
  type,
  postId = "",
  text = "",
}) {
  try {
    console.log("========== CREATE NOTIFICATION ==========");
    console.log("Receiver:", receiverId);
    console.log("Sender:", senderId);
    console.log("Sender Name:", senderName);
    console.log("Type:", type);

    if (!receiverId || !senderId) {
      console.log("❌ Missing receiverId or senderId");
      return;
    }

    if (receiverId === senderId) {
      console.log("❌ Self notification skipped");
      return;
    }

    const docRef = await addDoc(notificationsRef, {
      receiverId,
      senderId,
      senderName,
      senderPhoto,
      type,
      postId,
      text,
      read: false,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Notification Created");
    console.log("Document ID:", docRef.id);
  } catch (error) {
    console.error("❌ Notification Error:", error);
  }
}

// =======================================
// REALTIME NOTIFICATIONS
// =======================================
export function subscribeToNotifications(uid, callback) {
  console.log("========== NOTIFICATION LISTENER ==========");
  console.log("Current User:", uid);

  const q = query(
    notificationsRef,
    where("receiverId", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      console.log("Notification Count:", snapshot.size);

      const notifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Notifications:", notifications);

      callback(notifications);
    },
    (error) => {
      console.error("❌ Listener Error:", error);
    }
  );
}

// =======================================
// DELETE NOTIFICATION
// =======================================
export async function deleteNotification(id) {
  await deleteDoc(doc(db, "notifications", id));
}