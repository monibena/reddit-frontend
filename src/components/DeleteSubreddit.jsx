import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../lib";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";

export default function DeleteSubreddit({ subreddit }) {
  const { token, fetchSubreddits, user } = useOutletContext();
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  async function handleDelete(e) {
    setError("");
    e.preventDefault();

    const res = await fetch(`${API}/subreddits/${subreddit.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    fetchSubreddits();
    // console.log(info);

    if (!info.success) {
      setError(info.error);
      //Navigate("/login");
    } else {
      Navigate("/");
    }
  }
  return (
    // conditional that will check if authorized user to delete, if yes, delete button will show
    user.id === subreddit.userId && (
      <>
        <RiDeleteBin5Fill onClick={handleDelete} />

        {error && <p>{error}</p>}
      </>
    )
  );
}
