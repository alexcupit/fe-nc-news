import { Routes, Route } from 'react-router-dom';
import './App.css';
import Article from './components/Article';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import MyAccount from './components/MyAccount';
import TopicsList from './components/TopicsList';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/myaccount' element={<MyAccount />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/' element={<ArticlesList />} />
        <Route path='/topics' element={<TopicsList />} />
        <Route path='/topics/:topic' element={<ArticlesList />} />
        <Route path='/articles/:article_id' element={<Article />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
