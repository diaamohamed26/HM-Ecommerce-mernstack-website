const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Payment Method</h2>
      <div className="flex flex-col space-y-2">
        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Credit/Debit Card
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          PayPal
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Cash on Delivery
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
