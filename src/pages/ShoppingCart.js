import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  aumentarQnt = ({ target }) => {
    // botão de aumentar a quantidade do item
    {
      const { shopCartProducts } = this.props;
      const itemPosition = target.parentNode.id;
      shopCartProducts[itemPosition].quantity += 1;
    }
    this.forceUpdate();
  };

  diminuirQnt = ({ target }) => {
    // botão de diminuir a quantidade do item
    const { shopCartProducts } = this.props;
    const itemPosition = target.parentNode.id;
    if (shopCartProducts[itemPosition].quantity > 1) {
      shopCartProducts[itemPosition].quantity -= 1;
    }
    this.forceUpdate();
  };

  render() {
    const { shopCartProducts } = this.props;
    return (
      <section>
        {shopCartProducts.length ? ( // mano a função tá mec mas não sei pq não passa no teste da 10
          shopCartProducts.map((item, index) => (
            <div key={ item.title + item.id } id={ index }>
              <img src={ item.thumbnail } alt={ item.title } />
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ this.diminuirQnt }
              >
                -
              </button>
              <span data-testid="shopping-cart-product-quantity">
                {item.quantity}
              </span>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ this.aumentarQnt }
              >
                +
              </button>
              <span>{`- Preço: ${item.price * item.quantity}`}</span>
            </div>
          ))
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </section>
    );
  }
}

ShoppingCart.propTypes = {
  shopCartProducts: PropTypes.array,
}.isRequired;

export default ShoppingCart;
