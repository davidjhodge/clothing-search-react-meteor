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
import Privacy from '../../ui/Privacy/Privacy.jsx';

// Google Analytics
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function onUpdate() {
  logPageView();
  scrollToTop();
}

Meteor.startup( () => {
  render(
    <Router history={browserHistory} onUpdate={onUpdate}>
      <Route path="/" component={App}>
        <IndexRoute component={ProductSearch} />
        <Route path="/our-vision" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
