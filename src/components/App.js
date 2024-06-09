import { useEffect } from 'react';
import '../styles/App.css';
import { Header } from './Header';

function App() {
  useEffect(() => {
    const createRipple = (event) => {
      const ripple = document.getElementById('ripple');

      const x = event.clientX - 5;
      const y = event.clientY - 5;

      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('animate');

      setTimeout(() => {
        ripple.classList.remove('animate');
        ripple.style.left = '-100px';
        ripple.style.top = '100px';
      }, 190);
    };

    document.addEventListener('click', createRipple);

    return () => {
      document.removeEventListener('click', createRipple);
    };
  }, []);

  return (
    <div className='App'>
      <div id='ripple' className='ripple'></div>
      <Header />
      <div className='main'></div>
    </div>
  );
}

export default App;
