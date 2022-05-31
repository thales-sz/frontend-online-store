import React from 'react';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

class ReviewForm extends React.Component {
  state = {
    emailInput: '',
    checked: [false, false, false, false, false],
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
    const { checked } = this.state;
    const { name, value } = target;
    if (target.type === 'checkbox') {
      checked.map((star, index) => {
        console.log(checked[index]);
        if (index <= Number(target.value) - 1) {
          checked[index] = true;
        } else {
          checked[index] = false;
        }
        return this.setState({ checked });
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
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
    const rating = [ONE, TWO, THREE, FOUR, FIVE];
    const { checked } = this.state;
    return (
      <>
        <section>
          <form>
            <input
              type="email"
              name="emailInput"
              placeholder="Email"
              data-testid="product-detail-email"
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name="ratingInput"
              value={ rating[0] }
              checked={ checked[0] }
              data-testid={ `${rating[0]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name={ 1 }
              checked={ checked[1] }
              value={ rating[1] }
              data-testid={ `${rating[1]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name={ 2 }
              checked={ checked[2] }
              value={ rating[2] }
              data-testid={ `${rating[2]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name={ 3 }
              checked={ checked[3] }
              value={ rating[3] }
              data-testid={ `${rating[3]}-rating` }
              onChange={ this.handleChange }
            />
            <input
              type="checkbox"
              name={ 4 }
              checked={ checked[4] }
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
