import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/category';
import { getCategories } from '../services/api';
import './Home.css';

class Home extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
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
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          Ir para o carrinho
        </Link>
      </main>
    );
  }
}

export default Home;
