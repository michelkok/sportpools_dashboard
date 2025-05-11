import "../styles/globals.css"; // use relative path from /src/pages

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
