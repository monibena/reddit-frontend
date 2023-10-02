export default function ChildPost({ child }) {
  return (
    <>
      <div className="childContainer">
        <p>{child.text}</p>
      </div>
    </>
  );
}
