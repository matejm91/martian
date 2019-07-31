import React from 'react';
import './Post.css';
import SinglePost from './SinglePost';
import Logger from '../Logger/Logger';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params[0];
    this.state = {
      post: {},
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch(`https://demo.martian.agency/api/posts/${this.id}`, {
      headers: {
        'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU='
      }
    })
      .then(res => res.json())
      .then(post => {
        fetch(`https://demo.martian.agency/api/posts/${this.id}/comments`, {
          headers: {
            'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU='
          }
        })
          .then(res => res.json())
          .then(comments => {
            post.comments = comments;
            fetch(`https://demo.martian.agency/api/users`, {
              headers: {
                'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU='
              }
            })
              .then(res => res.json())
              .then(users => {
                post.user = users.find(user => user.id === post.userId);

                this.setState({ post, isLoaded: true });
              });
          });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    return (
      <SinglePost
        key={this.state.post.id}
        id={this.state.post.id}
        author={this.state.post.user.name}
        title={this.state.post.title}
        body={this.state.post.body}
        comments={this.state.post.comments}
      />
    );
  }
}

Post = Logger(Post, 'Post');
export default Post;
