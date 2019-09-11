import React, { Component } from "react";
// eslint-disable-next-line import/no-named-as-default
import Router from "next/router";
import qs from "qs";

import { findResultsState } from "../lib/instantSearch";
import Discover from "../components/Discover/Discover";

const DEBOUNCE_TIME = 800;

const createUrl = (searchState) => `?${qs.stringify(searchState)}`;

const searchStateToUrl = (searchState) =>
  searchState ? `${window.location.pathname}${createUrl(searchState)}` : "";

const urlToSearchState = (location) => qs.parse(location.search.slice(1));

class Index extends Component {
  static async getInitialProps(params) {
    const searchState = qs.parse(
      params.asPath.substring(params.asPath.indexOf("?") + 1)
    );
    const resultsState = await findResultsState(Discover, { searchState });

    return { resultsState, searchState };
  }

  constructor(props) {
    super(props);

    this.state = {
      searchState: null,
      lastLocation: null
    };

    this.onSearchStateChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      lastLocation: window.location.search,
      searchState: urlToSearchState(window.location)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (window.location.search !== prevState.lastLocation) {
      this.setState({
        lastLocation: window.location.search,
        searchState: urlToSearchState(window.location)
      });
    }
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState);

      Router.push(href, href, {
        shallow: true
      });
    }, DEBOUNCE_TIME);

    this.setState({ searchState });
  };

  render() {
    return (
      <Discover
        searchState={
          this.state && this.state.searchState
            ? this.state.searchState
            : this.props.searchState
        }
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
      />
    );
  }
}

export default Index;
