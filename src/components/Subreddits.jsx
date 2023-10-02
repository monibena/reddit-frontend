import { useOutletContext, useParams } from "react-router-dom";
import { API } from "../lib";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteSubreddit from "./DeleteSubreddit";
import CreateSubreddit from "./CreateSubreddit";

export default function Subreddits() {
  const { token, subreddits } = useOutletContext();
  //console.log(subreddits);

  return (
    <div>
      <div>
        <p>Communities</p>
        <CreateSubreddit />
        {subreddits.map((subreddit) => (
          <div key={subreddit.id}>
            <Link
              to={`/subreddits/${subreddit.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="delete-container">
                <p className="subreddit-font">/r{subreddit.name}</p>
                <DeleteSubreddit subreddit={subreddit} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
