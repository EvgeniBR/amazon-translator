import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.component';
import SearchPage from './components/SearchPage/SearchPage.component';
import History from './components/History/History.component';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/history" component={History} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
