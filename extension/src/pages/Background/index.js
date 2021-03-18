import store from '../../store/store';
import { wrapStore } from 'webext-redux';

wrapStore(store);

if (module.hot) module.hot.accept();
