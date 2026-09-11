import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { subscribeToNotifications } from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeNotifications = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("Auth User:", user);

      if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
      }

      unsubscribeNotifications = subscribeToNotifications(
        user.uid,
        (data) => {
          console.log("Notifications:", data);
          setNotifications(data);
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeNotifications) {
        unsubscribeNotifications();
      }
    };
  }, []);

  function getMessage(notification) {
    switch (notification.type) {
      case "follow":
        return "started following you";
      case "like":
        return "liked your post";
      case "comment":
        return `commented: "${notification.text}"`;
      case "repost":
        return "reposted your post";
      default:
        return "";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto">

        <div className="sticky top-0 bg-black border-b border-gray-800 p-5">
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="border-b border-gray-800 p-5 flex gap-4 hover:bg-gray-900"
            >
              <img
                src={
                  notification.senderPhoto ||
                  `https://ui-avatars.com/api/?background=1DA1F2&color=fff&name=${encodeURIComponent(
                    notification.senderName
                  )}`
                }
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p>
                  <strong>{notification.senderName}</strong>{" "}
                  {getMessage(notification)}
                </p>

                {notification.createdAt?.seconds && (
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(
                      notification.createdAt.seconds * 1000
                    ).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Notifications;