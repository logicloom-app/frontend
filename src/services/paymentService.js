import http from "./httpService";
import useGetToken from "@/lib/hooks/useGetToken";

export async function createPaypalOrder(amount) {
  const token = await useGetToken();

  return http
    .post(
      `/payment/create-order?amount=${amount}&currency=EUR`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    )
    .then(({ data }) => data);
}

export async function capturePaypalOrder(orderToken, payerId) {
  const token = await useGetToken();

  return http
    .post(
      `/payment/capture-order?order_id=${orderToken}&PayerID=${payerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    )
    .then(({ data }) => data);
}

export async function createStripeOrder(amount) {
  const token = await useGetToken();

  return http
    .post(
      `/payment/create-stripe-session`,
      {
        amount: amount,
        currency: "EUR",
      },
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    )
    .then(({ data }) => data);
}

export async function getPayments() {
  const token = await useGetToken();

  return http
    .get("/payments", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}
