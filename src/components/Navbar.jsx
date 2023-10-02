import { Link } from "react-router-dom";
import { BsReddit } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

export default function Navbar({ user, setToken, setUser }) {
  function handleLogout() {
    setToken(""); //reverse user is stored in token
    setUser({}); //reverse
    localStorage.removeItem("token");
  }

  return (
    <div className="nav-bar">
      {/* <div>
        <BsReddit color="red" size="30px" />
       
      </div> */}

      <Link to={"/"}>
        <BsReddit color="red" size="30px" />
        <AiFillHome color="black" size="30px" />
      </Link>

      {/* <Link to={"/subreddits"}>Subreddits</Link> */}

      {!user.id && (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      )}
      {user.id && (
        <>
          <span> Welcome {user.username}!</span>
          <Link to={"/submit"}>Create Post</Link>
          <Link onClick={handleLogout} to={"/"}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
}
