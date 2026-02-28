import Checkout from "../components/checkout";

const CheckoutPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <main className="flex-1">
        <Checkout />
      </main>
    </div>
  );
};

export default CheckoutPage;
