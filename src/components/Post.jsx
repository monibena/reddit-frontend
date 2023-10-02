import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { API } from "../lib";
import DeletePost from "./DeletePost";
import Votes from "./Votes";
import ChildPost from "./ChildPost";
import { BiComment } from "react-icons/bi";
import CreateComment from "./CreateComment";

export default function Post() {
  //const [post, setPost] = useState("");
  const { posts, fetchPosts } = useOutletContext();
  const [children, setChildren] = useState([]);

  const postId = useParams().postId;

  //find post with matching ID
  const post = posts.find((_post) => _post.id === postId);

  //console.log(postId);
  // useEffect(() => {
  async function fetchChildren() {
    //console.log("hi");
    const res = await fetch(`${API}/posts/${postId}`);

    const info = await res.json();
    setChildren(info.post.children);
    //console.log(info);
    //console.log(children);
  }
  //   fetchChildren();
  // }, [postId]);

  useEffect(() => {
    fetchChildren();
    fetchPosts();
  }, [postId]);

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
          <DeletePost post={post} />
        </div>
        <CreateComment
          postId={postId}
          subredditId={post.subreddit.id}
          fetchChildren={fetchChildren}
        />
      </div>
      {/* {post.children &&
        post.children.map((child) => {
          <p>{post.children.text}</p>;
        })} */}
      {post.children.map((child) => (
        <ChildPost key={child.id} child={child} />
      ))}
    </div>
  );
}

// function ChildPost({ child }) {
//   return (
//     <div className="child-post" key={child.id}>
//       {/* Render child comment content here */}
//       <p>{child.text}</p>
//     </div>
//   );
// }
