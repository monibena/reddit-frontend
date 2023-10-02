import { useOutletContext, useParams } from "react-router-dom";
import Votes from "./Votes";

export default function Subreddit() {
  const { subreddits, posts } = useOutletContext();
  const { subredditId } = useParams(); //targets the ID in the url

  // console.log(subredditId);

  //finds correct subreddit based on the subredditid taken from params
  const subreddit = subreddits.find(
    (subreddit) => subreddit.id === subredditId
  );

  //filters out posts that belong to subreddit above
  const filteredPosts = posts.filter(
    (post) => post.subredditId === subreddit.id
  );

  // console.log(filteredPosts);

  return (
    <div className="posts-container">
      {filteredPosts.map((post) => (
        <div className="post" key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.text}</p>
          <p>{post.user.username}</p>

          {/* check to see if post has children */}

          {/* {post.children && post.children.length > 0 && (
            <div>
              <h2>Children Posts:</h2>

              {post.children.map((childPost) => (
                <p>{childPost.text}</p>
              ))}
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
