import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  state = {
    searchInput: '',
    shopCartProducts: [],
    productList: [],
  };

  addToCart = ({ target }) => {
    const { productList } = this.state;
    const selectedItem = productList.filter((item) => item.id === target.id);
    this.setState((prev) => ({
      shopCartProducts: [...prev.shopCartProducts, selectedItem] }));
  };

  searchItem = async () => {
    const { searchInput } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchInput}`;

    return fetch(url)
      .then((resposta) => resposta.json())
      .then((data) => this.setState({ productList: data.results }))
      .catch((error) => error);
  }

  searchByCategory = async ({ target }) => {
    const fetchCategory = await getProductsFromCategoryAndQuery(target.id);
    this.setState({ productList: fetchCategory.results });
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  render() {
    const { shopCartProducts, productList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Home
                addToCart={ this.addToCart }
                onClick={ this.searchItem }
                onChange={ this.handleChange }
                searchByCategory={ this.searchByCategory }
                productList={ productList }
              />) }
          />
          <Route
            path="/shoppingcart"
            render={ () => (
              <ShoppingCart
                productList={ productList }
                shopCartProducts={ shopCartProducts }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
