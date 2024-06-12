import 'react-calendar/dist/Calendar.css';
import { Outlet } from 'react-router';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
