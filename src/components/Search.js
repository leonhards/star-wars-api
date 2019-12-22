import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  static propTypes = {
    searchText: PropTypes.func.isRequired
  }

  state = {
    filterText: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchText(this.state.filterText);
    this.setState({ filterText: '' });
  }

  onChange = (e) => this.setState({
    filterText: e.target.value 
  });

  render() {
    const {
      onSubmit,
      onChange,
      state: {
        filterText
      }
    } = this;
    
    return (
      <React.Fragment>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Search Title or Name..."
            value={filterText}
            onChange={onChange}
          />
          <button type="submit">
            <i className="fa fa-lg fa-search"></i>
          </button>
        </form>
      </React.Fragment>
    )
  }
}

export default Search