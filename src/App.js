import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { getProductsFromCategoryAndQuery, getProductById } from './services/api';
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

  checkItem = async ({ target }) => { // essa função checa se o item já está no carrinho se já tiver aumenta a quantidade e caso não tenha chama a addToCart.
    const itemID = target.parentElement.id;
    const { shopCartProducts } = this.state;
    const selectedItem = await getProductById(itemID);
    console.log(selectedItem);
    selectedItem.quantity = 1;
    const itemPosition = shopCartProducts.findIndex(
      (item) => item.id === selectedItem.id,
    );
    const magicNumber = -1;
    if (itemPosition > magicNumber) {
      shopCartProducts[itemPosition].quantity += 1;
    } else {
      this.addToCart(selectedItem);
    }
  }

  addToCart = (selectedItem) => { // adiciona o novo carrinho
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
                checkItem={ this.checkItem }
                searchItem={ this.searchItem }
                handleChange={ this.handleChange }
                searchByCategory={ this.searchByCategory }
                productList={ productList }
                shopCartProducts={ shopCartProducts }
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
                checkItem={ this.checkItem }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
