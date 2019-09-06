import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <style>{`#__next { height: 100% } .ais-InstantSearch__root { height: 100% }`}</style>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.0/themes/algolia-min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
