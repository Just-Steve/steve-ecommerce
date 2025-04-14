import React, { useState } from "react";

// Dummy FAQ data
const initialFaqs = [
  {
    question: "How do I track my order?",
    answer:
      "After placing your order, you can track its status in the 'My Orders' section of your account. You will also receive email updates with tracking information once your order is shipped.",
  },
  {
    question: "What is the return policy?",
    answer:
      "We accept returns within 30 days of purchase. The item must be unused, in its original condition, and accompanied by the original receipt. Please visit our Returns page for more details.",
  },
  {
    question: "How do I update my account information?",
    answer:
      "You can update your personal details in the 'Account Settings' section of your profile. This includes your name, email, address, and password. If you have any issues, please contact our support team.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept various payment methods including Credit Cards, Debit Cards, PayPal, and more. The available options will be displayed during checkout.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team through the Contact Us form on this page or by emailing support@example.com. We aim to respond within 24 hours.",
  },
];

const UserSupport = () => {
  // FAQ state
  const [faqs, setFaqs] = useState(initialFaqs);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Toggle a single FAQ open/close
  const toggleFaq = (index) => {
    setActiveFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Handle form submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!contactName || !contactEmail || !contactMessage) {
      setFormError("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      // Clear form
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to Our Help Center
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Find answers, review our policies, or contact us directly.
        </p>
      </header>

      {/* Navigation Links (optional anchor links) */}
      <nav className="max-w-4xl mx-auto mb-12 flex flex-wrap gap-4 justify-center text-lg">
        <a
          href="#faq-section"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          FAQs
        </a>
        <a
          href="#return-policy-section"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return Policy
        </a>
        <a
          href="#shipping-info-section"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Shipping Info
        </a>
        <a
          href="#contact-section"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Contact Us
        </a>
      </nav>

      {/* FAQ Section */}
      <section id="faq-section" className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 hover:bg-gray-100"
              >
                <span className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </span>
                <span className="text-2xl text-gray-600">
                  {activeFaqIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeFaqIndex === index && (
                <div className="p-4 bg-gray-100 text-gray-700 border-t transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Return Policy Section */}
      <section
        id="return-policy-section"
        className="mb-16 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Return Policy
        </h2>
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            We accept returns within <strong>30 days</strong> of purchase. The
            item must be unused, in its original condition, and accompanied by
            the original receipt or proof of purchase.
          </p>
          <p className="mb-4">
            To initiate a return, please visit our Returns page or contact our
            support team with your order details. Once we receive and inspect
            the returned item, a refund will be processed to your original
            payment method.
          </p>
          <p className="mb-4">
            For more details or to start a return, please reach out to our
            support team at{" "}
            <a
              href="mailto:returns@example.com"
              className="text-blue-600 hover:underline"
            >
              returns@example.com
            </a>
            .
          </p>
          <p className="mb-4">
            <strong>Exceptions:</strong> Certain items may be non-returnable
            (e.g., perishable goods, personal care items). Refer to the product
            description or contact our support for clarity.
          </p>
        </div>
      </section>

      {/* Shipping Info Section */}
      <section
        id="shipping-info-section"
        className="mb-16 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Shipping Information
        </h2>
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            We strive to process orders within <strong>1-2 business days</strong>{" "}
            after payment confirmation. Shipping times vary depending on your
            location and chosen shipping method.
          </p>
          <ul className="list-disc ml-5 mb-4">
            <li>
              <strong>Standard Shipping:</strong> Estimated delivery within 5-7
              business days.
            </li>
            <li>
              <strong>Express Shipping:</strong> Estimated delivery within 2-3
              business days.
            </li>
            <li>
              <strong>International Shipping:</strong> Delivery times vary by
              region; customs fees may apply.
            </li>
          </ul>
          <p className="mb-4">
            Once your order ships, you will receive a confirmation email with
            tracking information. You can also track your order status in the
            “My Orders” section of your account.
          </p>
          <p>
            If you have any questions about shipping or experience delays,
            please contact us at{" "}
            <a
              href="mailto:shipping@example.com"
              className="text-blue-600 hover:underline"
            >
              shipping@example.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-section"
        className="mb-16 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        {formSubmitted ? (
          <div className="text-center">
            <p className="text-2xl text-green-600 font-semibold">
              Thank you for your message! Our support team will contact you
              shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleContactSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="How can we help you?"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>
            {formError && (
              <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                {formError}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserSupport;
