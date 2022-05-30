import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  render() {
    const { productDetails, checkItem } = this.props;
    const { id, price, title, thumbnail } = productDetails[0];

    return (
      <section>
        <h2 data-testid="product-detail-name">{title}</h2>
        <h2>{price}</h2>
        <div>
          <img src={ thumbnail } alt={ title } />
        </div>
        <div>
          <button
            type="button"
            onClick={ checkItem }
            id={ id }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            Ir para o carrinho
          </Link>
        </div>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  productDetails: PropTypes.object,
}.isRequired;

export default ProductDetails;
