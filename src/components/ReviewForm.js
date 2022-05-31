import React from 'react';

class ReviewForm extends React.Component {
  state = {
    emailInput: '',
    rateInput: [],
    reviewInput: '',
    fullReview: [],
  }

  saveReview = () => {
    const { fullReview, emailInput, rateInput, reviewInput } = this.state;
    this.setState((prev) => ({
      fullReview: [...prev.fullReview, emailInput, rateInput, reviewInput] }));
    localStorage.setItem('fullReview', JSON.stringify(fullReview));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderReviews = () => {
    const savedReviews = JSON.parse(localStorage.getItem('fullReview'));
    return (
      <div>
        {savedReviews.map((review) => (
          <div key={ review.emailInput }>
            <p>{review.emailInput}</p>
            <p>{review.rateInput}</p>
            <p>{review.reviewInput}</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const rating = [1, 2, 3, 4, 5];
    return (
      <>
        <section>
          <form>
            <input
              type="email"
              name="emailInput"
              data-testid="product-detail-email"
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name="rateInput"
              value={ rating[0] }
              data-testid={ `${rating[0]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name="rateInput"
              value={ rating[1] }
              data-testid={ `${rating[1]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name="rateInput"
              value={ rating[2] }
              data-testid={ `${rating[2]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name="rateInput"
              value={ rating[3] }
              data-testid={ `${rating[3]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              value="5"
              name="rateInput"
              value={ rating[4] }
              data-testid={ `${rating[4]}-rating` }
              onChange={ this.handleChange }
            />
            <textarea
              name="reviewInput"
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="submit-review-btn"
              name="reviewInput"
              onClick={ this.saveReview }
            >
              Enviar avaliação
            </button>
          </form>
        </section>
        <section>
          { localStorage.fullReview && this.renderReviews() }
        </section>
      </>
    );
  }
}

export default ReviewForm;
