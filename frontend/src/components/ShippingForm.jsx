const ShippingForm = ({ shippingInfo, setShippingInfo }) => {
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Shipping Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={shippingInfo.name || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={shippingInfo.address || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={shippingInfo.city || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={shippingInfo.postalCode || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={shippingInfo.country || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
    </div>
  );
};

export default ShippingForm;
