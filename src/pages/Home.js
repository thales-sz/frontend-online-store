import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/category';
import { getCategories } from '../services/api';
import './Home.css';
// import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    searchInput: '',
    categories: [],
    productList: [],
  };

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  searchItem = async () => {
    const { searchInput } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchInput}`;

    return fetch(url)
      .then((resposta) => resposta.json())
      .then((data) => this.setState({ productList: data.results }))
      .catch((error) => error);
  }

  render() {
    const { productList, categories } = this.state;

    return (
      <main>
        <section className="category-container">
          Categorias:
          {' '}
          {categories.map((item) => (<Category
            id={ item.id }
            name={ item.name }
            key={ item.id }
          />))}
        </section>
        <section data-testid="home-initial-message">
          <section>
            <input
              type="text"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.searchItem }
            >
              Pesquisar

            </button>
          </section>
          {
            productList.length
              ? (
                productList.map((item) => (
                  <div key={ item.id } data-testid="product">
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{item.title}</p>
                    <p>{item.price}</p>
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

export default Home;

