import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-90659201-1');

import App from '../../ui/App/App.jsx';
import ProductSearch from '../../ui/ProductSearch/ProductSearch.jsx';
import About from '../../ui/About/About.jsx';
import Contact from '../../ui/Contact/Contact.jsx';
import NotFound from '../../ui/NotFound/NotFound.jsx';
import Terms from '../../ui/Terms/Terms.jsx';

// Google Analytics
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

Meteor.startup( () => {
  render(
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/" component={App}>
        <IndexRoute component={ProductSearch} />
        <Route path="/our-vision" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="*" component={NotFound} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Terms} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
