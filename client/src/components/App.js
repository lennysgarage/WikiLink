import '../styles/App.css';
import { useEffect } from 'react';
import { keepTheme } from '../utils/themes';
import Header from './Header';
import Toggle from './Toggle';
import Wikify from './wikifyLink'; 
import Particles from 'react-tsparticles';
import particleOptions from '../utils/particles.json';


function App() {
  useEffect(() => {
    keepTheme();
  });


  return (
    <div className="App">
        <Particles options={particleOptions} />
        <Header />
        <Toggle />
        <Wikify />
    </div>
  )
}

export default App;