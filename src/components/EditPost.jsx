import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API } from "../lib";
import { useState } from "react";

export default function EditPost() {
  const { postId } = useParams(); //extract postId from URL
  const { token, posts, fetchPosts, user } = useOutletContext();

  const post = posts.find((_post) => _post.id === postId);

  //state var. intialized
  const [text, setText] = useState(post.text);
  const [title, setTitle] = useState(post.title);
  const [error, setError] = useState("");

  const Navigate = useNavigate();
  //   const [editPost, setEditPost] = useState("");

  async function handleUpdate(e) {
    setError("");
    e.preventDefault();
    //console.log("hello");

    //PUT request to update post using the postID that was extracted from URl
    const res = await fetch(`${API}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });
    const info = await res.json();

    //Handle errors
    if (!info.success) {
      return setError(info.error);
    }
    setText("");
    setTitle("");

    fetchPosts();

    Navigate("/");
    console.log(info);
  }

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Edit post title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Edit post.."
        />
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
