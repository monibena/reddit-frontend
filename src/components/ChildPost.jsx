import CreateComment from "./CreateComment";

export default function ChildPost({ child, post }) {
  return (
    <>
      <div className="childContainer">
        <p>{child.text}</p>
        <p>Posted by u/{post.user.username}</p>
      </div>
    </>
  );
}
