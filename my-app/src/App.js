import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      amount: "1000",
    };
  }

  componentDidMount = () => {
    this.loadScript("https://checkout.razorpay.com/v1/checkout.js");
  };

  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  onClickPay = () => {
    const fdata = { pay: this.state.amount };

    fetch("http://localhost:8080/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fdata),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          id: result.data.orderdetails.id,
        });
      });

    var options = {
      key: "IIIIIIIIIDDDDDDDD", // Enter the Key ID generated from the Dashboard
      amount: this.state.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Pijush Kanti Nandi",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: this.state.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "User",
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>Sample Razorpay payment web app.</p>

          <button onClick={this.onClickPay}>Pay</button>
        </header>
      </div>
    );
  }
}

export default App;
