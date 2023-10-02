import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API } from "../lib";
import Select from "react-select";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { token, posts, subreddits, fetchPosts } = useOutletContext();
  const [subreddit, setSubreddit] = useState([]); //state updater for selected option
  const [error, setError] = useState("");
  const [parentId, setParentId] = useState("");

  //console.log(subreddits.name);

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    //console.log(token);

    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title, // optional
        text,
        subredditId: subreddit.value, //sets subredditId  to value selected by user
        parentId: parentId || null, // optional
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.eror);
    }

    //how cna we clear the input text
    setText("");
    setTitle("");

    fetchPosts();

    // console.log(info);
  }

  //maps over subreddit array and creates a new options array with value=id and label=name
  const options = subreddits.map((subreddit) => ({
    value: subreddit.id,
    label: subreddit.name,
  }));
  //console.log(text);
  return (
    <div>
      {/* <EditPost text={text} setText={setText} /> */}
      <form onSubmit={handleSubmit}>
        <Select
          options={options}
          // used to capture changes made by the user
          onChange={(selectedOption) => setSubreddit(selectedOption)}
          value={subreddit}
        />

        {/* Hidden input field for parentId */}
        {/* <input
          type="hidden"
          name="parentId"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        /> */}

        <input
          type="text"
          placeholder="Enter post title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter new post.."
        />
        <button>Create Post</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
