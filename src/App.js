import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  state = {
    searchInput: '',
    shopCartProducts: [],
    productList: [],
    productDetails: [],
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

  seeProductDetails = ({ target }) => {
    console.log(target.id);
    const { productList } = this.state;
    const detailedItem = productList.filter((item) => item.id === target.id);
    this.setState({ productDetails: detailedItem });
  };

  // A IDEIA DA FUNÇÃO ACIMA É SETAR O ESTADO PRODUCTDETAILS COM O OBJETO
  // CORRESPONDENTE AO PRODUTO CLICADO. DEPOIS, PASSAR ESSE ESTADO COMO
  // PROPS PARA A PAGINA PRODUCT DETAILS, PARA DESESTRUTUAR LÁ E MONTAR A EXIBIÇÃO DO PRODUTO

  render() {
    const { shopCartProducts,
      productList,
      productDetails,
    } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Home
                addToCart={ this.addToCart }
                searchItem={ this.searchItem }
                handleChange={ this.handleChange }
                searchByCategory={ this.searchByCategory }
                productList={ productList }
                seeProductDetails={ this.seeProductDetails }
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
          <Route
            path="/product-details"
            render={ () => (
              <ProductDetails
                productDetails={ productDetails }
                addToCart={ this.addToCart }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
