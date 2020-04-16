import React from "react";
var qs = require("qs");
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.omniseToken = null;
    this.form = null;
    this.userId = null;
    this.showText = null;
    this.packageId = null;
    this.amountBind = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).amount;
    this.setOmniseTokenRef = (element) => {
      this.omniseToken = element;
    };
    this.setFormRef = (element) => {
      this.form = element;
    };
    this.setUserIdRef = (element) => {
      this.userId = element;
    };
    this.setShowTextRef = (element) => {
      this.showText = element;
    };
    this.setAmountRef = (element) => {
      this.amount = element;
    };
    this.setPackageIdRef = (element) => {
      this.packageId = element;
    };
    this.createTokenSuccessHandler = (token) => {
      // console.log("create token success");
      // console.log(token);
      this.omniseToken.value = token;
      this.amount.value = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      }).amount;
      this.packageId.value = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      }).packageId;
      console.log('packageId');
      console.log(this.packageId.value);
      this.form.submit();
    };
    this.formClosedhandler = () => {
      //console.log("Form is closed.");
      this.showText.innerHTML = "cancelled.";
    };
  }
  componentDidMount() {
    this.userId.value = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).userId;
    const { OmiseCard } = window;
    OmiseCard.configure({
      publicKey: "pkey_test_5jidn0btttxalmew8gn",
      image: "https://cdn.omise.co/assets/dashboard/images/omise-logo.png",
      amount: this.amountBind,
    });
    OmiseCard.open({
      frameLabel: "KMITL FITNESS",
      submitLabel: "PAY RIGHT NOW !",
      currency: "THB",
      onCreateTokenSuccess: this.createTokenSuccessHandler,
      onFormClosed: this.formClosedhandler,
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color : "orange"
          }}
        >
          <h1 ref={this.setShowTextRef}> processing... </h1>
        </div>
        <form
          id="checkout-form"
          method="POST"
          action="https://kmitl-fitness.herokuapp.com/api/payment/charge"
          ref={this.setFormRef}
        >
          <input type="hidden" name="omiseToken" ref={this.setOmniseTokenRef} />
          <input type="hidden" name="userId" ref={this.setUserIdRef} />
          <input type="hidden" name="amount" ref={this.setAmountRef} />
          <input type="hidden" name="packageId" ref={this.setPackageIdRef} />
        </form>
      </div>
    );
  }
}

export default Payment;
