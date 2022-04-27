import { render } from 'react-dom';
import { StrictMode } from 'react';
import App from 'src/components/App';

const rootReactElement = (
  <StrictMode>
    <App />
  </StrictMode>
);
const target = document.getElementById('root');
render(rootReactElement, target);
