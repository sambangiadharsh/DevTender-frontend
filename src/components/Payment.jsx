import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPrimeMember, setIsPrimeMember] = useState(false);

  // Verify if user is already a premium member
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });
      setIsPrimeMember(res.data.isPremium);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyPremiumUser(); // Run once on component load
  }, []);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBuyNow = async () => {
    if (selectedPlan) {
      try {
        alert(
          `You have selected the ${selectedPlan} plan. Redirecting to payment...`
        );
        const order = await axios.post(
          BASE_URL + "/payment/create",
          { membershipType: selectedPlan },
          { withCredentials: true }
        );

        const { amount, notes, currency, orderId } = order.data.savedPayment;
        const { keyId } = order.data;

        const options = {
          key: keyId, // Your Razorpay key_id
          amount, // Amount in paise
          currency,
          name: "TinDev",
          description: "Enjoy your subscription",
          order_id: orderId, // Backend-generated order_id
          prefill: {
            name: notes.firstName + " " + notes.lastName,
            email: notes.emailId,
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
          handler: verifyPremiumUser,
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please choose a plan before proceeding.");
    }
  };

  return isPrimeMember ? (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center border border-green-500">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congratulations!</h2>
      <p className="text-gray-700 mb-4">
        You are already a <span className="font-semibold text-green-500">Premium Member</span>. Enjoy unlimited access to exclusive features.
      </p>
      <button
        onClick={() => window.location.href = "/feed"}
        className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
      >
        🚀 Go to Dashboard
      </button>
    </div>
  </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upgrade to Premium and Enjoy Exclusive Features
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Silver Plan */}
        <div
          className={`w-80 p-6 rounded-2xl shadow-lg cursor-pointer ${
            selectedPlan === "silver"
              ? "border-4 border-blue-500"
              : "border border-gray-200"
          } bg-white hover:shadow-2xl transition-all`}
          onClick={() => handleSelectPlan("silver")}
        >
          <h2 className="text-2xl font-semibold mb-3">💬 Silver Plan</h2>
          <p className="text-gray-700">✅ Connect with up to 150 people</p>
          <p className="text-gray-700">📅 Access valid for 3 months</p>
          <p className="mt-3 text-blue-500 font-semibold">₹499 only</p>
        </div>

        {/* Golden Plan */}
        <div
          className={`w-80 p-6 rounded-2xl shadow-lg cursor-pointer ${
            selectedPlan === "gold"
              ? "border-4 border-yellow-500"
              : "border border-gray-200"
          } bg-white hover:shadow-2xl transition-all`}
          onClick={() => handleSelectPlan("gold")}
        >
          <h2 className="text-2xl font-semibold mb-3">🌟 Golden Plan</h2>
          <p className="text-gray-700">✅ Unlimited people interaction</p>
          <p className="text-gray-700">📅 Access valid for 6 months</p>
          <p className="mt-3 text-yellow-500 font-semibold">₹999 only</p>
        </div>
      </div>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className="mt-8 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
      >
        🛒 Proceed to Buy
      </button>
    </div>
  );
};

export default Premium;
