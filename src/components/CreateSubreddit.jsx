import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API } from "../lib";

export default function CreateSubreddit() {
  const { token, subreddits, fetchSubreddits } = useOutletContext();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  //console.log(subreddits.name);

  //console.log(subreddits);

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    //console.log(token);

    const res = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();
    console.log(info);

    if (!info.success) {
      setError(info.error);
      setName("");
      console.log(error);
    } else {
      //how cna we clear the input text
      setName("");
      fetchSubreddits();
      setIsFormVisible(false);
      console.log(subreddits);
    }
  }

  return (
    token && (
      <div>
        {!isFormVisible ? (
          <button onClick={() => setIsFormVisible(true)}>
            Create a community
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            Create a community
            <textarea
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="r/"
            />
            <button>Create Community</button>
            {error && <p>{error}</p>}
          </form>
        )}
      </div>
    )
  );
}
