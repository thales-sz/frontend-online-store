import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Category from '../components/category';
import { getCategories } from '../services/api';
import './Home.css';

class Home extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { addToCart,
      searchByCategory,
      handleChange,
      searchItem,
      productList,
      seeProductDetails } = this.props;
    const { categories } = this.state;

    return (
      <main>
        <section className="category-container">
          Categorias:
          {' '}
          {categories.map((item) => (
            <Category
              id={ item.id }
              name={ item.name }
              key={ item.id }
              searchByCategory={ searchByCategory }
            />))}
        </section>
        <section data-testid="home-initial-message">
          <section>
            <input
              type="text"
              data-testid="query-input"
              onChange={ handleChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ searchItem }
            >
              Pesquisar
            </button>
          </section>
          {
            productList.length
              ? (
                productList.map((item) => (
                  <div key={ item.id } data-testid="product" id={ item.id }>
                    <Link
                      to="/product-details"
                      data-testid="product-detail-link"
                    >
                      <div
                        role="button"
                        className="product-info"
                        onClick={ seeProductDetails }
                        onKeyDown={ seeProductDetails }
                        tabIndex={ 0 }
                        id={ item.id }
                      >
                        <img src={ item.thumbnail } alt={ item.title } />
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={ addToCart }
                      id={ item.id }
                      data-testid="product-add-to-cart"
                    >
                      Adicionar ao carrinnho
                    </button>
                  </div>
                ))
              )
              : <p> Digite algum termo de pesquisa ou escolha uma categoria.</p>
          }
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            Ir para o carrinho
          </Link>
        </section>
      </main>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func,
  searchByCategory: PropTypes.func,
  handleChange: PropTypes.func,
  searchItem: PropTypes.func,
  productList: PropTypes.array,
}.isRequired;

export default Home;
