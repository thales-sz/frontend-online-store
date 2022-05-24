import React from 'react';
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
      </main>
    );
  }
}

export default Home;
