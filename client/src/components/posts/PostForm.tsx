import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { addPost } from "../../store/actions/post";

const PostForm: React.FC<PropsFromRedux> = ({ addPost }) => {
  const [value, setValue] = useState<string>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost(value);
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
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

const connector = connect(null, { addPost });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostForm);
