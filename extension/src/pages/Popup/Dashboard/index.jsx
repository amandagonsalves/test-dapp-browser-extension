import React from 'react';
import { render } from 'react-dom';

import Dashboard from './Dashboard';

render(<Dashboard />, window.document.querySelector('.app-container'));

if (module.hot) module.hot.accept();