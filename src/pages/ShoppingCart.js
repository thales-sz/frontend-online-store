import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const itemQuantity = [];
    const { shopCartProducts } = this.props;
    return (
      <section>
        {shopCartProducts.length ? (
          shopCartProducts.map((product) => {
            console.log(product);
            let quantity = 0;
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
