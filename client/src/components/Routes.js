import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { MainPage } from "../pages/MainPage";
import { CreatePage } from "../pages/CreatePage";
import { RecipePage } from "../pages/RecipePage";
import { HistoryPage } from "../pages/HistoryPage";
import { EditPage } from "../pages/EditPage";

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/create" component={CreatePage} />
    <Route path="/recipe/:id" component={RecipePage} />
    <Route path="/history/:id" component={HistoryPage} />
    <Route path="/edit/:id" component={EditPage} />
    <Redirect to="/" />
  </Switch>
);
