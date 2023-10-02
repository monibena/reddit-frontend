import { useOutletContext } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { API } from "../lib";

export default function Votes({ post }) {
  const { token, fetchPosts } = useOutletContext();

  async function handleUpVote() {
    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
    if (!info.success) {
      deleteUpVote();
    }
  }

  async function handleDownVote() {
    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
    if (!info.success) {
      deleteDownVote();
    }
  }

  async function deleteUpVote() {
    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
  }

  async function deleteDownVote() {
    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
  }

  return !token ? (
    <></>
  ) : (
    <>
      <button
        onClick={() => {
          handleUpVote();
          deleteDownVote();
        }}
      >
        <FaArrowUp />
      </button>
      {post.upvotes.length - post.downvotes.length}
      <button
        onClick={() => {
          handleDownVote();
          deleteUpVote();
        }}
      >
        <FaArrowDown />
      </button>
    </>
  );
}
