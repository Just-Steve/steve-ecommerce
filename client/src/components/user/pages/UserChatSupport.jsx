import { useState, useEffect, useRef } from "react";

// Define 10 different client names
const clientNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Edward",
  "Fiona",
  "George",
  "Helen",
  "Ian",
  "Jane",
];

// Generate an array of messages where each of the 10 clients
// sends 11 messages, and each message is followed by a support reply.
const initialMessages = [];
const baseTime = Date.now() - 10 * 11 * 60000; // Start time in the past

let messageId = 1;
for (let i = 0; i < clientNames.length; i++) {
  const client = clientNames[i];
  for (let j = 0; j < 11; j++) {
    // Each client message
    const clientTimestamp = new Date(baseTime + messageId * 60000).toISOString();
    initialMessages.push({
      id: messageId++,
      sender: client, // The client's name
      content: `Hi, I'm ${client}. This is message #${j + 1}. I would like more information about your product and its warranty, please.`,
      timestamp: clientTimestamp,
    });

    // Support reply, 30 seconds after the client message
    const supportTimestamp = new Date(
      new Date(clientTimestamp).getTime() + 30000
    ).toISOString();
    initialMessages.push({
      id: messageId++,
      sender: "support",
      content: `Hello ${client}, thank you for your message #${j + 1}. We will be happy to assist you with more details. Please let us know any additional specifics you might be interested in.`,
      timestamp: supportTimestamp,
    });
  }
}

const UserChatSupport = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCover, setShowCover] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate sending a new user message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError("");
    if (newMessage.trim() === "") {
      setError("Please enter a message.");
      return;
    }
    setLoading(true);

    // Simulate network delay for sending message
    setTimeout(() => {
      const userMessage = {
        id: Date.now(),
        sender: "user", // This is the "you" in the chat
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setLoading(false);

      // Simulate an automated support reply
      simulateSupportReply();
    }, 800);
  };

  // Automated support reply
  const simulateSupportReply = () => {
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "support",
        content:
          "Thank you for your message. Our support team will respond shortly. Meanwhile, please check our FAQ for quick help.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  // Render each message with left or right alignment
  const renderMessage = (message) => {
    // "support" messages are aligned to the left; others to the right
    const isSupport = message.sender === "support";
    return (
      <div
        key={message.id}
        className={`flex mb-4 ${isSupport ? "justify-start" : "justify-end"}`}
      >
        <div
          className={`max-w-md p-4 rounded-lg shadow-md ${
            isSupport
              ? "bg-gray-100 text-gray-800 rounded-bl-none"
              : "bg-blue-500 text-white rounded-br-none"
          }`}
        >
          <p className="text-base">{message.content}</p>
          <p className="text-xs text-right mt-2">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const coverTimer = setTimeout(() => setShowCover(false), 1000);
    return () => clearTimeout(coverTimer);
  }, []);

  if (showCover) {
    return (
      <div className="relative h-screen w-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source
            src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/MPaEbz-/videoblocks-no-people-dolly-shot-of-casual-clothes-at-sale-section-in-modern-clothing-store-of-big-shopping-centre_s-o8g04fu__a8d3647e4fce78ba90f98f93c3ea654f__P360.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold">Welcome</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-transparent min-h-screen flex flex-col">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center">
          Support Chat
        </h1>
        <p className="text-xl text-gray-700 text-center mt-2">
          Chat live with our support team for quick assistance.
        </p>
      </header>

      {/* Chat Window */}
      <div className="flex-1 bg-transparent rounded-lg shadow-xl p-6 overflow-y-auto">
        {messages.map((msg) => renderMessage(msg))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleSendMessage}
        className="mt-6 flex flex-col md:flex-row items-center"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 md:mt-0 md:ml-4 px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Chat Support &copy; {new Date().getFullYear()} - All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserChatSupport;
