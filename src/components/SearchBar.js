import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  handleChange = event => {
    const { value } = event.target;

    this.setState({
      searchText: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSearch(this.state.searchText);
  };

  render() {
    return (
      <form id="search-bar" onSubmit={this.handleSubmit}>
        <label htmlFor="search-text">
          <span aria-label="magnifying glass" role="img">
            🔎
          </span>
        </label>
        <input
          type="text"
          id="search-text"
          name="search-text"
          value={this.state.searchText}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
