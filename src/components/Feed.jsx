import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { subscribeToPosts, deletePost } from "../services/postService";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((data) => {
      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  async function handleDelete(id) {
    try {
      await deletePost(id);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className="w-full md:w-1/2 min-h-screen border-r border-gray-800 text-white">

      <header className="border-b border-gray-800 p-5">
        <h1 className="text-2xl font-bold">Home</h1>
      </header>

      <CreatePost />

      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDelete}
        />
      ))}

    </main>
  );
}

export default Feed;