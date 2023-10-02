import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { API } from "../lib";
import DeletePost from "./DeletePost";
import Votes from "./Votes";
import ChildPost from "./ChildPost";
import CreateComment from "./CreateComment";
import { FiEdit3 } from "react-icons/fi";

export default function Post() {
  //const [post, setPost] = useState("");
  const { posts, fetchPosts, user } = useOutletContext();
  const [children, setChildren] = useState([]);

  const { postId } = useParams();

  // console.log(postId);

  // //useEffect(() => {
  async function fetchChildren() {
    //console.log("hi");
    const res = await fetch(`${API}/posts/${postId}`);

    const info = await res.json();
    setChildren(info.post.children);
    //console.log(info);
  }
  fetchPosts();

  useEffect(() => {
    fetchChildren();
  }, [postId]);

  //

  //find post with matching ID
  const post = posts.find((_post) => _post.id === postId);

  //if post not found
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="posts-container">
      <div className="post" key={postId}>
        <Link to={`/subreddits/${post.subreddit.id}`}>
          <span>r/{post.subreddit.name}</span>
        </Link>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <p>Posted by u/{post.user.username}</p>
        <div className="icon-container">
          <Votes post={post} />
          <DeletePost post={post} />

          {/* checks that logged in user is authorized to edit */}
          {user.id === post.userId && (
            <Link to={`/editPosts/${post.id}`}>
              <button type="submit">
                <FiEdit3 />
              </button>
            </Link>
          )}
        </div>

        <CreateComment postId={postId} subredditId={post.subreddit.id} />
      </div>

      {post.children.map((child) => (
        <ChildPost key={child.id} child={child} post={post} />
      ))}
    </div>
  );
}
