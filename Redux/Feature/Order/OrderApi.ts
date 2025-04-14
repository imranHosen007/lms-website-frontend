import { apiSlice } from "../Api/ApiSlice";

export const OrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderPublishKey: builder.query({
      query: () => ({
        url: "/order/payment/publish-key",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    newPayment: builder.mutation({
      query: (amount) => ({
        url: "/order/payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    createNewOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetOrderPublishKeyQuery,
  useNewPaymentMutation,
  useCreateNewOrderMutation,
} = OrderApi;
