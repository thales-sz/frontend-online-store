import React from 'react';
import PropTypes from 'prop-types';

let quantity = 0;

// Eu implementei os 2 botoes de aumentar e diminuir a quantidade, tentei mudar o valor da 'quantity' direto na variavel mas n deu certo
class ShoppingCart extends React.Component {
  increaseOrDecrease = ({ target }) => {
    if (target.id === 'increase') {
      quantity += 1;
    } else {
      quantity -= 1;
    } this.forceUpdate();
  }

  render() {
    const itemQuantity = [];
    const { shopCartProducts } = this.props;
    return (
      <section>
        {shopCartProducts.length ? (
          shopCartProducts.map((product) => {
            const verifyProduct = product[0].title;
            shopCartProducts.forEach((prod) => {
              if (verifyProduct === prod[0].title) {
                quantity += 1;
              }
            });
            if (itemQuantity.includes(verifyProduct)) {
              return null;
            }
            itemQuantity.push(verifyProduct);
            return (
              <div
                className="shopcart-product"
                key={ product[0].id }
              >
                <p data-testid="shopping-cart-product-name">
                  {product[0].title}
                </p>
                <p data-testid="shopping-cart-product-quantity">{quantity}</p>
                <p>{product[0].price * quantity}</p>
                <div className="quantity-buttons">
                  <button
                    type="button"
                    onClick={ this.increaseOrDecrease }
                    id="decrease"
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={ this.increaseOrDecrease }
                    id="increase"
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        )
          : (
            <div data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </div>
          )}
      </section>
    );
  }
}

ShoppingCart.propTypes = {
  shopCartProducts: PropTypes.array,
}.isRequired;

export default ShoppingCart;
