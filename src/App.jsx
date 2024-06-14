import 'react-calendar/dist/Calendar.css';
import { Outlet } from 'react-router';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-container'>
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
