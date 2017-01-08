import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import App from '../../ui/App.jsx';
import ProductSearch from '../../ui/ProductSearch.jsx';
import About from '../../ui/About.jsx';
import Contact from '../../ui/Contact.jsx';

Meteor.startup( () => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ProductSearch} />
        <Route path="/our-mission" component={About} />
        <Route path="/contact" component={Contact} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
