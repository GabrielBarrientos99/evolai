import {createRoot} from 'react-dom/client';
import '../styles.css';
import {Shell} from '../app/Shell';
import Privacidad from '../pages/Privacidad';

createRoot(document.getElementById('root')!).render(
  <Shell actual="privacidad">
    <Privacidad />
  </Shell>,
);
