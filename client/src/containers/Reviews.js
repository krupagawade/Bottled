import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchBeer,
  addComment,
  deleteComment
} from '../store/actions/beerActions';
import PropTypes from 'prop-types';

import asyncComponent from '../utils/asyncComponent';

const Spinner = asyncComponent(() => import('../components/Spinner'));
const ReviewCard = asyncComponent(() => import('../components/ReviewCard'));
const Comments = asyncComponent(() => import('../components/Comments'));

class Reviews extends Component {
  state = {
    comment: '',
    errors: {}
  };

  componentDidMount = () => {
    const beerId = this.props.history.location.pathname.split('/')[2];
    this.props.fetchBeer(beerId);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitHandler = id => {
    const comment = {
      text: this.state.comment
    };
    this.props.addComment(id, comment);
    this.setState({ comment: '' });
  };

  onCommentDeleteHandler = (id, comment_id) => {
    this.props.deleteComment(id, comment_id);
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let reviewContent;
    if (this.props.beer.loading) {
      reviewContent = (
        <div>
          <Spinner />{' '}
          <p style={{ textAlign: 'center' }}>
            Finding beer... If this spinner does not go away, you may not have
            made any purchases
          </p>
        </div>
      );
    }
    if (this.props.beer.review !== null && !this.props.beer.loading) {
      const { name, description, image_url, _id } = this.props.beer.review;
      const { comment, errors } = this.state;
      reviewContent = (
        <div>
          <ReviewCard
            beerName={name}
            description={description}
            name="comment"
            value={comment}
            err={errors.hasOwnProperty('text') ? true : false}
            image={image_url}
            onClick={() => this.onSubmitHandler(_id)}
            onChange={this.onChangeHandler}
          />
          {this.props.beer.review.hasOwnProperty('comments')
            ? this.props.beer.review.comments.map(cmnt => (
                <Comments
                  name={cmnt.userName}
                  comment={cmnt.text}
                  isUser={cmnt._user === this.props.auth.user.id ? true : false}
                  onClick={() => this.onCommentDeleteHandler(_id, cmnt._id)}
                  key={cmnt._id}
                  date={cmnt.date}
                />
              ))
            : null}
        </div>
      );
    }
    return <div>{reviewContent}</div>;
  }
}

Reviews.propTypes = {
  fetchBeer: PropTypes.func.isRequired,
  beer: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  beer: state.beer,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchBeer, addComment, deleteComment }
)(withRouter(Reviews));
