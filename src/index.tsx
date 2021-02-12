import React from 'react';
import { render } from 'react-dom';
import App from './App';

require('electron-reloader')(module);

render(<App />, document.getElementById('root'));
