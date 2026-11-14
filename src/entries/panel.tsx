import {createRoot} from 'react-dom/client';
import '../styles.css';
import {Shell} from '../app/Shell';
import Panel from '../pages/Panel';

createRoot(document.getElementById('root')!).render(
  <Shell actual="panel">
    <Panel />
  </Shell>,
);
