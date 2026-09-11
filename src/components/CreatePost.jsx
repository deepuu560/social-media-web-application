import { useState } from "react";
import { auth } from "../firebase";
import { createPost } from "../services/postService";

function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handlePost() {
    if (!auth.currentUser) {
      alert("Please login first.");
      return;
    }

    if (text.trim() === "" && !image) {
      alert("Write something or choose an image.");
      return;
    }

    try {
      setLoading(true);

      await createPost(
        auth.currentUser,
        text,
        image
      );

      setText("");
      setImage(null);
      setPreview("");

      document.getElementById("postImage").value = "";
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="border-b border-gray-800 p-5">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        rows={4}
        className="w-full bg-black text-white text-xl outline-none resize-none"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 rounded-xl w-full max-h-96 object-cover"
        />
      )}

      <input
        id="postImage"
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="mt-4 block"
      />

      <button
        onClick={handlePost}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-2 mt-5"
      >
        {loading ? "Posting..." : "Post"}
      </button>

    </div>
  );
}

export default CreatePost;