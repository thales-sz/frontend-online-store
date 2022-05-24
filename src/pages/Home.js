import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">Ir para o carrinho</Link>
      </>
    );
  }
}

export default Home;
