import React from 'react';

class ProductDetails extends React.Component {
  render() {
    // const { productDetails } = this.props;

    return (
      <section>
        <h2 data-testid="product-detail-name">titulo</h2>
        <h2>preço</h2>
        <div>
          foto
        </div>
        <div>
          descriçao
        </div>
      </section>
    );
  }
}

export default ProductDetails;
