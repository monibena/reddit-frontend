import { useEffect, useState } from "react";
import { API } from "../lib";
import { useOutletContext, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Subreddits from "./Subreddits";
import DeleteSubreddit from "./DeleteSubreddit";
import Votes from "./Votes";
import DeletePost from "./DeletePost";
import { FiEdit3 } from "react-icons/fi";

export default function Home() {
  const { posts, subreddits, user } = useOutletContext();

  //console.log(posts);

  //const postId = useParams().postId;

  //find post with matching ID
  // const post = posts.find((_post) => _post.id === postId);

  //if post not found
  // if (!post) {
  //   return <p>Post not found</p>;
  // }

  const topLevelPosts = posts.filter((post) => post.parentId === null);
  //console.log(topLevelPosts);

  return (
    <div className="whole-container">
      <div className="subreddit-container">
        <Subreddits />
        {/* <DeleteSubreddit /> */}
      </div>

      <div className="posts-container">
        {topLevelPosts.map((post) => (
          <div className="post" key={post.id}>
            <Link to={`/subreddits/${post.subreddit.id}`}>
              <span>r/{post.subreddit.name}</span>
            </Link>
            <Link
              to={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {/* <Link to={`/subreddits/${post.subreddit.id}`}>
                <span>r/{post.subreddit.name}</span>
              </Link> */}

              <h1>{post.title}</h1>
              <p>{post.text}</p>
              <p>Posted by u/{post.user.username}</p>
            </Link>

            <div className="icon-container">
              <Votes post={post} />

              {/* checks that logged in user is authorized to edit */}
              {user.id === post.userId && (
                <Link to={`/editPosts/${post.id}`}>
                  <button type="submit">
                    <FiEdit3 />
                  </button>
                </Link>
              )}
              <DeletePost post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
