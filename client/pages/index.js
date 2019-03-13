import React, { Component } from "react";
import Router from "next/router";
import qs from "qs";

import { findResultsState } from "../lib/instantSearch";
import Discover from "../components/Discover";

const updateAfter = 700;

const searchStateToUrl = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";

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

    this.onSearchStateChange.bind(this);
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState);

      Router.push(href, href, {
        shallow: true
      });
    }, updateAfter);

    this.setState({ searchState });
  };

  componentDidMount() {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) });
  }

  render() {
    return (
      <Discover
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
        searchState={
          this.state && this.state.searchState
            ? this.state.searchState
            : this.props.searchState
        }
      />
    );
  }
}

export default Index;
