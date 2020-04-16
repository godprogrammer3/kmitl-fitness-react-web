import React from "react";
var qs = require("qs");
class PaymentResult extends React.Component {
  constructor(props) {
    super(props);
    this.message = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).message;
    if(this.message === 'payment success.'){
      this.messageColor = 'green';
    }else{
      this.messageColor = 'red';
    }
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: this.messageColor
        }}
      >
        <h1>{this.message}</h1>
      </div>
    );
  }
}

export default PaymentResult;
