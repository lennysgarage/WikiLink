import './styles/App.css';
import { useEffect } from 'react';
import { keepTheme } from './utils/themes';
import Header from './components/Header';
import Toggle from './components/Toggle';
import Wikify from './components/wikifyLink'; 

function App() {
  useEffect(() => {
    keepTheme();
  });


  return (
    <div className="App">
      <Header />
      <Toggle />
      <Wikify />
    </div>
  )
}

export default App;