const OrderSummary = ({ cartItems = [], totalPrice = 0 }) => {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Order Summary</h2>
      <ul className="space-y-2">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))
        ) : (
          <li>Your cart is empty</li>
        )}
      </ul>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
