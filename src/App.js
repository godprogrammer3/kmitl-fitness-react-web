import React from "react";
import "./App.css";
import Home from "./component/Home";
import Payment from "./component/Payment";
import PaymentResult from "./component/PaymentResult";
import { Switch, Route } from "react-router-dom";
function App(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/payment_result" component={PaymentResult} />
      </Switch>
    );
}

export default App;
