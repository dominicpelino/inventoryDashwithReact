import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Dashboard, SignIn } from './components';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

import './styles.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store = {store}>
        <ThemeProvider theme = {theme}>
          <Router>
            <Routes>
              <Route path='/' element={<Home title  ={'If everyone was a Hero, no one would be.'}/>} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/signin' element={<SignIn />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
