const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);


// import React, { useRef, useState } from 'react';
// import emailjs from '@emailjs/browser';

// const ServiceEnquiryForm = () => {
//   const form = useRef();
//   const [success, setSuccess] = useState(false);

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm(
//       'your_service_id',    // Replace with your EmailJS service ID
//       'your_template_id',   // Replace with your EmailJS template ID
//       form.current,
//       'your_public_key'     // Replace with your EmailJS public key
//     )
//     .then(() => {
//       setSuccess(true);
//       form.current.reset();
//     })
//     .catch((error) => {
//       console.error('FAILED...', error.text);
//     });
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-pink-600">Service Enquiry Form</h2>

//       <form ref={form} onSubmit={sendEmail} className="space-y-4">
//         <input
//           type="text"
//           name="user_name"
//           placeholder="Your Name"
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         />

//         <input
//           type="email"
//           name="user_email"
//           placeholder="Your Email"
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         />

//         <textarea
//           name="message"
//           rows="5"
//           placeholder="Describe your service enquiry..."
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         ></textarea>

//         <button
//           type="submit"
//           className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded transition"
//         >
//           Submit Enquiry
//         </button>

//         {success && (
//           <p className="text-green-600 mt-2 text-center">Your enquiry was sent successfully!</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ServiceEnquiryForm;
