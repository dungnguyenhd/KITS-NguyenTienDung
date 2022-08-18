import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import StudentAddNew from './components/StudentAddNew';
import StudentUpdate from './components/StudentUpdate';
import StudentDetail from './components/StudentDetail';
import StudentAvg from './components/StudentAvg';


function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<StudentAddNew />} />
          <Route path="/edit/:id" element={<StudentUpdate />} />
          <Route path="/detail/:id" element={<StudentDetail />} />
          <Route path="/avg" element={<StudentAvg />} />
      </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
