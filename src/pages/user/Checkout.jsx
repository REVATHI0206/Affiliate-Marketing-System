import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Checkout() {5
  const navigate = useNavigate();

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const userId =
    localStorage.getItem("userId");

  const [loading, setLoading] =
    useState(false);

  const totalAmount =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const placeOrder =
    async () => {
      try {
        setLoading(true);

        const products =
          cart.map((item) => ({
            product:
              item._id,
            quantity:
              item.quantity,
          }));

        await axios.post(
          "http://localhost:5000/api/orders",
          {
            user: userId,
            products,
            totalAmount,
          }
        );

        localStorage.removeItem(
          "cart"
        );

        alert(
          "Order Placed Successfully"
        );

        navigate(
          "/user/orders"
        );
      } catch (err) {
        console.log(err);
        alert(
          "Order Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {cart.map(
            (item) => (
              <div
                key={
                  item._id
                }
                className="flex justify-between py-2 border-b"
              >
                <span>
                  {item.name} ×{" "}
                  {
                    item.quantity
                  }
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>
              </div>
            )
          )}

          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>
              Total
            </span>

            <span>
              ₹
              {
                totalAmount
              }
            </span>
          </div>

          <Button
            className="w-full mt-6"
            onClick={
              placeOrder
            }
            disabled={
              loading
            }
          >
            {loading
              ? "Placing..."
              : "Place Order"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}