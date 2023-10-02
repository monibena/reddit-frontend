import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API } from "../lib";
import { BiComment } from "react-icons/bi";

export default function CreateComment({ postId, subredditId }) {
  const { token, subreddits, fechPosts, posts } = useOutletContext();

  //console.log(posts);

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  //console.log(subredditId);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        subredditId,
        parentId: postId, // Set the parent ID to the current post's ID
      }),
    });

    const info = await res.json();
    //console.log(info);

    if (!info.success) {
      setError(info.error);
      //console.log(error);
    } else {
      //how cna we clear the input text
      setText("");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your comment.."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button>Submit Comment</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
