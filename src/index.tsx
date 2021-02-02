import React from 'react';
import { render } from 'react-dom';
import App from './App';

try {
    require('electron-reloader')(module) 
} catch (_) {}
render(<App />, document.getElementById('root'));
