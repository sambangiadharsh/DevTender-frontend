import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBuyNow =async () => {
    if (selectedPlan) {
      try{
        alert(
          `You have selected the ${selectedPlan} plan. Redirecting to payment...`
        );
        const order=await axios.post(BASE_URL+"/payment/create",{membershipType:selectedPlan},{withCredentials:true});
       
        const {amount,notes,currency,orderId}=order.data.savedPayment;
        console.log(notes);
        const {keyId}=order.data;
        const options = {
          key: keyId, // Replace with your Razorpay key_id
          amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency,
          name: 'TinDev',
          description: 'Enjoy your subscription',
          order_id: orderId, // This is the order_id created in the backend
      
          prefill: {
            name: notes.firstName +" "+notes.lastName,
            email: notes.emailId,
            contact: '9999999999'
          },
          theme: {
            color: '#F37254'
          },
        }
         const rzp = new window.Razorpay(options);
          rzp.open();
      }
      catch(err){
        console.log(err)
      }
    } 
  
    else {
      alert("Please choose a plan before proceeding.");
    }
  };

  return (
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
