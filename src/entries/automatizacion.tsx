import {createRoot} from 'react-dom/client';
import '../styles.css';
import {Shell} from '../app/Shell';
import Automatizacion from '../pages/Automatizacion';

createRoot(document.getElementById('root')!).render(
  <Shell actual="automatizacion">
    <Automatizacion />
  </Shell>,
);
