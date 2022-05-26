import React from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends React.Component {
  render() {
    const { productDetails } = this.props;
    console.log(productDetails);
    const { id, price, title, thumbnail } = productDetails[0];
    console.log(id, title, price, thumbnail);
    return (
      <section>
        <h2 data-testid="product-detail-name">{title}</h2>
        <h2>{price}</h2>
        <div>
          <img src={ thumbnail } alt={ title } />
        </div>
        <div>
          descriçao
        </div>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  productDetails: PropTypes.object,
}.isRequired;

export default ProductDetails;
