import { Routes, Route } from 'react-router-dom';
import './App.css';
import Article from './components/Article';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<ArticlesList />} />
        <Route path={'/articles/:article_id'} element={<Article />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
