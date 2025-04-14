import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import { useCreateNewOrderMutation } from "@/Redux/Feature/Order/OrderApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

interface Props {
  setOpen: (open: boolean) => void;
  data: any;
  user: any;
}
const CheckoutForm: React.FC<Props> = ({ data, setOpen, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [createNewOrder, { isSuccess: orderData, error }] =
    useCreateNewOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {} = useLoadUserQuery({
    skip: loadUser ? false : true,
  });

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message as any);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status == "succeeded") {
      setLoading(false);

      const newOrder = {
        courseId: data?.course?._id,
        payment_info: paymentIntent,
      };
      createNewOrder(newOrder);
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      setOpen(false);
      socketId.emit("notifaction", {
        title: "New Order",
        message: `You Have New Order From ${data?.course?.name}`,
        userId: user?._id,
      });
      redirect(`/course-access/${data?.course?._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [orderData]);
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement className="payment-element" />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="mt-2 !h-[35px] btn "
      >
        {isLoading ? "Paying...." : "Pay Now"}
      </button>
      {message && (
        <div id="payment-message" className="pt-2 text-red-600 font-Poppins">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
