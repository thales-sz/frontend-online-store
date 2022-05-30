import React from 'react';
import PropTypes from 'prop-types';

let quantity = 0;

class ShoppingCart extends React.Component {
  state={
    productList: [],
  }

  componentDidMount = () => {
    const productList = [];
    const itemQuantity = [];
    console.log(productList);
    const { shopCartProducts } = this.props;
    shopCartProducts.map((product, index) => {
      quantity = 0;
      const verifyProduct = product[0].title;
      shopCartProducts.forEach((prod) => {
        if (verifyProduct === prod[0].title) {
          quantity += 1;
        }
      });
      const prodObj = {
        id: product[0].id,
        title: product[0].title,
        price: product[0].price,
        quantity,
      };
      if (index === shopCartProducts.length - 1) {
        this.setState({ productList });
      }
      if (itemQuantity.includes(verifyProduct)) {
        return null;
      }
      productList.push(prodObj);
      itemQuantity.push(verifyProduct);
      return (
        null
      );
    });
  }

  increaseOrDecrease = ({ target }) => {
    const { productList } = this.state;
    const changeQnt = productList.find((product) => product.id === target.id);
    if (target.name === 'increase') {
      productList[productList.indexOf(changeQnt)] = {
        id: changeQnt.id,
        title: changeQnt.title,
        quantity: changeQnt.quantity + 1,
        price: changeQnt.price,
      };
    } else {
      if (productList[productList.indexOf(changeQnt)].quantity === 1) {
        productList[productList.indexOf(changeQnt)] = {
          id: changeQnt.id,
          title: changeQnt.title,
          quantity: 1,
          price: changeQnt.price,
        };
      }
      productList[productList.indexOf(changeQnt)] = {
        id: changeQnt.id,
        title: changeQnt.title,
        quantity: changeQnt.quantity - 1,
        price: changeQnt.price,
      };
    }
    this.setState({ productList });
  }

  render() {
    const { shopCartProducts } = this.props;
    const { productList } = this.state;
    console.log(shopCartProducts, productList);
    return (
      <section>
        {shopCartProducts.length ? (
          productList.map((product) => (
            <div
              className="shopcart-product"
              key={ product.id }
            >
              <p data-testid="shopping-cart-product-name">
                {product.title}
              </p>
              <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
              <p>{product.price * product.quantity}</p>
              <div className="quantity-buttons">
                <button
                  type="button"
                  name="decrease"
                  id={ product.id }
                  onClick={ this.increaseOrDecrease }
                  data-testid="product-decrease-quantity"
                >
                  -
                </button>
                <button
                  type="button"
                  name="increase"
                  onClick={ this.increaseOrDecrease }
                  id={ product.id }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
              </div>
            </div>
          ))
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
