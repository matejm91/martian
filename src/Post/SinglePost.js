import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';
import Logger from '../Logger/Logger';

const propTypes = {
  props: PropTypes.object
};

const defaultProps = {
  props: {}
};

let SinglePost = props => {
  console.log('%c⧭', 'color: #aa00ff', props);
  return (
    <div className="Post">
      <p>{props.author}</p>
      <p>
        <a href={`/post/${props.id}`}>{props.title}</a>
      </p>
      <p>{props.body}</p>
      <p>Comments:</p>
      <div className="comments">
        {props.comments.map(comment => (
          <div>
            <p>{comment.email}</p>
            <p>{comment.name}</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

SinglePost.propTypes = propTypes;
SinglePost.defaultProps = defaultProps;

SinglePost = Logger(SinglePost, 'SinglePost');
export default SinglePost;
