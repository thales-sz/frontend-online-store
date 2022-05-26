import React from 'react';

class ReviewForm extends React.Component {
  render() {
    const rating1Star = 1;
    const rating2Star = 2;
    const rating3Star = 3;
    const rating4Star = 4;
    const rating5Star = 5;
    return (
      <>
        <section>
          <form>
            <input type="email" data-testid="product-detail-email" />
            <div data-testid={ `${rating1Star}-rating` } />
            <div data-testid={ `${rating2Star}-rating` } />
            <div data-testid={ `${rating3Star}-rating` } />
            <div data-testid={ `${rating4Star}-rating` } />
            <div data-testid={ `${rating5Star}-rating` } />
            <textarea data-testid="product-detail-evaluation" />
            <button
              type="button"
              data-testid="submit-review-btn"
            >
              Enviar avaliação
            </button>
          </form>
        </section>
        <section>
          <p>AQUI VAI O EMAIL</p>
          <div>AQU VAI A ESTRELA DA AVALIALÇÃO</div>
          <p>AQUI VAI O TEXTO DA AVAILIAÇÃO</p>
          {/* O COMPONENTE ACIMA,
          QUE REPLICA A AVALIAÇÃO,
          TEM QUE SER REDENRIZADO DINAMICAMENTE */}
        </section>
      </>
    );
  }
}

export default ReviewForm;
