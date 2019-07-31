import React from 'react';
import PropTypes from 'prop-types';

import './App.css';
import SinglePost from '../Post/SinglePost';
import Logger from '../Logger/Logger';

const propTypes = {
  filterPosts: PropTypes.func
};

const defaultProps = {
  filterPosts: () => {}
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredPosts: [],
      posts: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    fetch('https://demo.martian.agency/api/posts', {
      headers: {
        'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU='
      }
    })
      .then(res => res.json())
      .then(
        posts => {
          fetch('https://demo.martian.agency/api/users', {
            headers: {
              'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU='
            }
          })
            .then(res => res.json())
            .then(
              users => {
                let postsWithUsers = posts.map(post => {
                  const user = users.find(user => user.id === post.userId);
                  post.user = user;
                  return post;
                });

                fetch('https://demo.martian.agency/api/comments', {
                  headers: {
                    'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU='
                  }
                })
                  .then(res => res.json())
                  .then(
                    comments => {
                      const postsWithUsersComments = postsWithUsers.map(
                        post => {
                          const commentsFiltered = comments.filter(
                            comment => comment.postId === post.id
                          );
                          post.comments = commentsFiltered;
                          return post;
                        }
                      );
                      this.setState({
                        posts: postsWithUsersComments,
                        isLoaded: true,
                        filteredPosts: postsWithUsersComments
                      });
                    },
                    error => {
                      this.setState({ error });
                    }
                  );
              },
              error => {
                this.setState({ error });
              }
            );
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  filterPosts = val => {
    if (val === '') {
      this.setState({ filteredPosts: this.state.posts });
    } else {
      let filteredPosts = this.state.posts.filter(post =>
        post.user.name.toLowerCase().startsWith(val.toLowerCase())
      );
      this.setState({ filteredPosts });
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    return (
      <div className="App">
        <div className="searchBar">
          <input
            className="searchField"
            type="text"
            name="filterPosts"
            placeholder=" Search by author..."
            onChange={e => this.filterPosts(e.target.value)}
          />
        </div>
        <div className="postsSection">
          {this.state.filteredPosts.map(post => (
            <SinglePost
              key={post.id}
              id={post.id}
              author={post.user.name}
              title={post.title}
              body={post.body}
              comments={post.comments}
              onPostClick={this.getPostById}
            />
          ))}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

App = Logger(App, 'App');
export default App;
