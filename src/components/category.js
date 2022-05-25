import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { id, name, searchByCategory } = this.props;
    return (
      <label htmlFor={ id } data-testid="category">
        <input
          type="radio"
          id={ id }
          name="name"
          value={ name }
          onChange={ searchByCategory }
        />
        { name }
      </label>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default Category;
