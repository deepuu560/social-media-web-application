import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { getPosts } from "../../services/postService";
import Post from "../Post";

function ProfilePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getPosts();

      const myPosts = allPosts.filter(
        (post) => post.userId === auth.currentUser?.uid
      );

      setPosts(myPosts);
    }

    loadPosts();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white px-6 mb-4">
        My Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 px-6">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            removePost={() => {}}
            refreshPosts={() => {}}
          />
        ))
      )}
    </div>
  );
}

export default ProfilePosts;