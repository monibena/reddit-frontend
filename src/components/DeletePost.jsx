import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../lib";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";

export default function DeletePost({ post }) {
  const { token, fetchPosts, user } = useOutletContext();
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  async function handleDelete(e) {
    setError("");
    e.preventDefault();

    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    fetchPosts();
    //console.log(info);

    if (!info.success) {
      setError(info.error);
      //Navigate("/login");
    } else {
      Navigate("/");
    }
  }
  return (
    // conditional that will check if authorized user to delete, if yes, delete button will show
    user.id === post.userId && (
      <>
        <button onClick={handleDelete} type="submit">
          <RiDeleteBin5Fill />
        </button>
        {/* <button>Cancel</button> */}
        {error && <p>{error}</p>}
      </>
    )
  );
}
