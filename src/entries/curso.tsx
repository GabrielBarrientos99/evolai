import {createRoot} from 'react-dom/client';
import '../styles.css';
import {Shell} from '../app/Shell';
import Curso from '../pages/Curso';

createRoot(document.getElementById('root')!).render(
  <Shell actual="curso">
    <Curso />
  </Shell>,
);
