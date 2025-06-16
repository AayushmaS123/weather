import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import background from './Assets/cloud.jpeg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app" style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        minHeight: '100vh'
      }}>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;