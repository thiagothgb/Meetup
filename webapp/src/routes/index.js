import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Details from '~/pages/Details';
import AddMeeting from '~/pages/AddMeeting';
import EditMeeting from '~/pages/EditMeeting';
import NotFound from '~/pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
      <Route path="/meeting/new" exact component={AddMeeting} isPrivate />
      <Route path="/meeting/:idMeet" exact component={Details} isPrivate />
      <Route
        path="/meeting/:idMeet/edit"
        exact
        component={EditMeeting}
        isPrivate
      />
      <Route path="/404" exact component={NotFound} doesntMatter />
      <Route component={NotFound} />
    </Switch>
  );
}
