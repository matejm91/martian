import React from 'react';
import './Post.css';
import Logger from '../Logger/Logger';

let SinglePost = props => {
  return (
    <div className="Post">
      <p>{props.author}</p>
      <p>
        <a href={`/post/${props.id}`}>{props.title}</a>
      </p>
      <p>{props.body}</p>
    </div>
  );
};

SinglePost = Logger(SinglePost, 'SinglePost');
export default SinglePost;
