import {createRoot} from 'react-dom/client';
import '../styles.css';
import {Shell} from '../app/Shell';
import Inicio from '../pages/Inicio';

createRoot(document.getElementById('root')!).render(
  <Shell actual="index">
    <Inicio />
  </Shell>,
);
