import { Route, Routes } from 'react-router-dom';
// UI Frameworks
import { Container } from 'react-bootstrap';
// Screens
import { Home } from './pages/Home';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;
