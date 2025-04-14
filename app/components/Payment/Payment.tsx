import {
  useGetOrderPublishKeyQuery,
  useNewPaymentMutation,
} from "@/Redux/Feature/Order/OrderApi";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
interface Props {
  setOpen: (open: boolean) => void;
  data: any;
  user: any;
}
const Payment: React.FC<Props> = ({ setOpen, data, user }) => {
  const { data: config } = useGetOrderPublishKeyQuery({});
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [
    newPayment,
    { isSuccess, data: paymentData, isLoading: paymentLoading },
  ] = useNewPaymentMutation();
  useEffect(() => {
    if (config) {
      const publishKey = config.puslishKey;
      setStripePromise(loadStripe(publishKey));
    }
    if (data) {
      const amount = Math.round(data?.course?.price * 100);
      newPayment(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentData) {
      setClientSecret(paymentData?.client_secret);
    }
  }, [paymentData]);

  return (
    <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
      <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
        <div className="w-full flex justify-end">
          <IoCloseOutline
            size={40}
            className="text-black dark:text-white cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="w-full">
          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm setOpen={setOpen} data={data} user={user} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
