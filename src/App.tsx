import { Route, Routes } from 'react-router-dom';
// UI Frameworks
import { Container } from 'react-bootstrap';
// Components
import { Navbar } from './components/Navbar';
// Screens
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { About } from './pages/About';

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
