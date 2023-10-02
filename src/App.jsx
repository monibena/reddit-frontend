import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { API } from "./lib";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);

  //const { title } = use;
  //console.log(token);
  //console.log(user);
  //------------------------------------------------------
  async function fetchUser() {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }

    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    //console.log(info);
    if (info.success) {
      setUser(info.user);
    }
  }

  // useEffect(() => {
  //   fetchUser();
  // }, [token]);

  //---------------------------------------------------
  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);

    const info = await res.json();
    //console.log(info);

    if (info.success) {
      setPosts(info.posts);
    }
  }
  //console.log(posts);
  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [token]);

  //------------------------------------------------------
  async function fetchSubreddits() {
    const res = await fetch(`${API}/subreddits/`);

    const info = await res.json();

    //console.log(info);

    if (info.success) {
      setSubreddits(info.subreddits);
    }
  }

  useEffect(() => {
    fetchSubreddits();
  }, [token]);
  //----------------------------------------------------------------------

  return (
    <div>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <hr />
      <Outlet
        context={{
          setToken,
          token,
          user,
          fetchPosts,
          posts,
          subreddits,
          fetchSubreddits,
        }}
      />
    </div>
  );
}
