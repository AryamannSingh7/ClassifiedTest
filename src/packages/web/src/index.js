// index.js - WEB
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from '../../components/src/registerServiceWorker';

ReactDOM.render(
      <Router>
      <Suspense fallback={null}>
        <App />
        </Suspense>
      </Router>,
  document.getElementById('root')
);
registerServiceWorker();
