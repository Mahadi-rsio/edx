import { useParams } from "react-router-dom"
import { useEffect } from "react";

function Comment() {
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    if (postId) {
      console.log(`Post ID from route: ${postId}`);
      // Add logic to fetch or handle the postId here
    }
  }, [postId]);

  return (
    <div className="comment">
      <h2>Comment</h2>
      <p>This is a comment component. {postId}</p>
    </div>
  );
}

export default Comment;