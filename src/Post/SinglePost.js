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
  return (
    <div className="Post">
      <p className="postAuthor">{props.author}</p>
      <p>
        Title:{' '}
        {props.isSingleDisplayed ? (
          props.title
        ) : (
          <a href={`/post/${props.id}`}>{props.title}</a>
        )}
      </p>
      <p>{props.body}</p>
      <p className="commentsBar">Comments:</p>
      <div className="comments">
        {props.comments.map((comment, index) => (
          <div className="singleComment" key={index}>
            <p className="commentator">{comment.email}</p>
            <p className="commentName">{comment.name}</p>
            <p className="commentBody">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

SinglePost.propTypes = propTypes;
SinglePost.defaultProps = defaultProps;

SinglePost = Logger(SinglePost, 'SinglePost');
export default SinglePost;
