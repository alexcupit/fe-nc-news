import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <ArticlesList />
    </div>
  );
}

export default App;
