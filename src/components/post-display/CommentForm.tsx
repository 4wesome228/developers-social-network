import React, { useState } from "react";

type Props = {
  postId: string;
  onAddComment: (postId: string, comment: string) => void;
};

const CommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [value, setValue] = useState<string>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(postId, value);
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols={20}
          rows={5}
          placeholder="Create a post"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
