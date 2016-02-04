import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import datasets from './datasets';

ReactDOM.render(<App datasets={datasets}/>, document.querySelector('[data-mount]'));
