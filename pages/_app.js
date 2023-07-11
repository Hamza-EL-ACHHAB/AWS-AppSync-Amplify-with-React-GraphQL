import '../styles/globals.css';
import '../configureAmplify';
import NavBar from './components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <div className="py-8 px-16 bg-slate-100">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
