import React from 'react';
import { hydrate } from 'react-dom';
import OneApp from './component/OneApp';
import './style/oneapp.scss';

hydrate(<OneApp />, document.getElementById('react-body'));
