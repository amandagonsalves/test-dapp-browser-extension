import React from 'react';
import { render } from 'react-dom';

import CreateAccount from './CreateAccount';

render(<CreateAccount />, window.document.querySelector('.app-container'));

if (module.hot) module.hot.accept();
