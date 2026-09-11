import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  likePost,
  repostPost,
} from "../services/postService";
import { subscribeToComments } from "../services/commentService";
import CommentSection from "./CommentSection";

function Post({ post, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const liked =
    auth.currentUser &&
    post.likes?.includes(auth.currentUser.uid);

  const reposted =
    auth.currentUser &&
    post.reposts?.includes(auth.currentUser.uid);

  useEffect(() => {
    const unsubscribe = subscribeToComments(post.id, (comments) => {
      setCommentCount(comments.length);
    });

    return () => unsubscribe();
  }, [post.id]);

  async function handleLike() {
    await likePost(post.id, auth.currentUser.uid);
  }

  async function handleRepost() {
    await repostPost(post.id, auth.currentUser.uid);
  }

  return (
    <article className="border-b border-gray-800 p-5 text-white">

      <div className="flex justify-between">

        <div>
          <h2 className="font-bold text-lg">
            {post.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {post.email}
          </p>
        </div>

        {auth.currentUser?.uid === post.uid && (
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-500"
          >
            Delete
          </button>
        )}

      </div>

      <p className="mt-4 whitespace-pre-wrap">
        {post.text}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt=""
          className="mt-4 rounded-xl w-full"
        />
      )}

      <div className="flex gap-10 mt-5">

        <button
          onClick={handleLike}
          className={
            liked ? "text-red-500" : ""
          }
        >
          ❤️ {post.likes?.length || 0}
        </button>

        <button
          onClick={() =>
            setShowComments(!showComments)
          }
        >
          💬 {commentCount}
        </button>

        <button
          onClick={handleRepost}
          className={
            reposted ? "text-green-500" : ""
          }
        >
          🔁 {post.reposts?.length || 0}
        </button>

      </div>

      {showComments && (
        <CommentSection postId={post.id} />
      )}

    </article>
  );
}

export default Post;