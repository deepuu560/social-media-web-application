import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  addComment,
  subscribeToComments,
} from "../services/commentService";

function CommentSection({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("CommentSection mounted");
    console.log("Post ID:", postId);

    const unsubscribe = subscribeToComments(postId, (data) => {
      console.log("Comments received:", data);
      setComments(data);
    });

    return () => unsubscribe();
  }, [postId]);

  async function handleComment() {
    console.log("========== HANDLE COMMENT ==========");

    console.log("Current User:", auth.currentUser);
    console.log("Post ID:", postId);
    console.log("Text:", text);

    if (!auth.currentUser) {
      console.log("User is null");
      alert("Please login first.");
      return;
    }

    if (text.trim() === "") {
      console.log("Comment text is empty");
      alert("Write something first.");
      return;
    }

    try {
      console.log("Calling addComment()...");

      await addComment({
        postId,
        userId: auth.currentUser.uid,
        displayName:
          auth.currentUser.displayName ||
          auth.currentUser.email.split("@")[0],
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL || "",
        text,
      });

      console.log("Comment added successfully!");

      setText("");
    } catch (error) {
      console.error("Comment Error:", error);
      alert(error.message);
    }
  }

  return (
    <div className="mt-4">

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Write a reply..."
          value={text}
          onChange={(e) => {
            console.log("Typing:", e.target.value);
            setText(e.target.value);
          }}
          className="flex-1 bg-black border border-gray-700 rounded-full px-4 py-2 text-white"
        />

        <button
          type="button"
          onClick={handleComment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
        >
          Reply
        </button>

      </div>

      <div className="mt-5 space-y-4">

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-800 rounded-xl p-3"
            >
              <p className="font-semibold">
                {comment.displayName}
              </p>

              <p className="text-sm text-gray-500">
                {comment.email}
              </p>

              <p className="mt-2">
                {comment.text}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default CommentSection;