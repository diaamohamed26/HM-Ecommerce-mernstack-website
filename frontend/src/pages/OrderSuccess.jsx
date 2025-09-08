import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
      <p className="mt-4 text-lg">
        Your order ID is: <span className="font-mono">{id}</span>
      </p>
    </div>
  );
};

export default OrderSuccess;
