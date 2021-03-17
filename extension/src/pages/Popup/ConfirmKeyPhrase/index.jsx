import React from 'react';
import { render } from 'react-dom';

import ConfirmKeyPhrase from './ConfirmKeyPhrase';

render(<ConfirmKeyPhrase />, window.document.querySelector('.app-container'));

if (module.hot) module.hot.accept();
