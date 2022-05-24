import React from 'react';
// import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    searchInput: '',
    productList: [],
  };

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
    const { productList } = this.state;

    return (
      <div data-testid="home-initial-message">
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
      </div>
    );
  }
}

export default Home;
