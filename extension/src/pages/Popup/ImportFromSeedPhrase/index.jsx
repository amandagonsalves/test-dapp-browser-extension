import React from 'react';
import { render } from 'react-dom';

import ImportFromSeedPhrase from './ImportFromSeedPhrase';

render(<ImportFromSeedPhrase />, window.document.querySelector('.app-container'));

if (module.hot) module.hot.accept();
