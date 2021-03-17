import React from 'react';
import { render } from 'react-dom';

import Welcome from './Welcome.jsx';

render(<Welcome />, window.document.querySelector('.app-container'));

if (module.hot) module.hot.accept();