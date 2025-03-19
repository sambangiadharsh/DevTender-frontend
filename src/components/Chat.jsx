import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CreateSocketConnection } from "../utils/sockets";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { IoSendSharp } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";

const Chat = () => {
  const { targetUserId } = useParams(); // Get targetUserId from params
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userFirstname = user?.firstName;
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Fetch initial messages
  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = data?.messages.map((msg) => ({
        senderFirstname: msg?.senderId[0]?.firstName || "Anonymous",
        text: msg?.text,
        time: msg?.createdAt,
        senderId: msg?.senderId[0]?._id, // Add senderId for comparison
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Fetch messages when targetUserId changes
  useEffect(() => {
    if (targetUserId) {
      fetchMessages();
    }
  }, [targetUserId]);

  // Initialize WebSocket and handle incoming messages
  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = CreateSocketConnection();
    const socket = socketRef.current;

    socket.emit("joinChat", { userId, targetUserId });

    const handleReceivedMessage = ({ senderFirstname, text, time, senderId }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderFirstname, text, time, senderId },
      ]);
    };

    socket.on("receivedMessage", handleReceivedMessage);

    return () => {
      socket.off("receivedMessage", handleReceivedMessage);
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message to WebSocket
  const sendMessage = () => {
    if (input.trim() !== "") {
      const userMessage = {
        text: input,
        userId,
        targetUserId,
        senderFirstname: userFirstname,
      };

      socketRef.current.emit("sendMessage", userMessage);

      // Add message immediately to avoid delay
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderFirstname: userFirstname,
          text: input,
          time: new Date(),
          senderId: userId, // Include senderId to identify sender
        },
      ]);

      setInput("");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white text-lg font-bold py-4 px-6 flex justify-between items-center">
        <span className="text-2xl font-bold text-black-600 tracking-wide align-middle">Chat</span>

          <span className="text-sm font-normal text-gray-300">Online</span>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => {
            const isSender = msg?.senderId === userId;

            return (
              <div
                key={index}
                className={`flex ${
                  isSender ? "justify-end" : "justify-start"
                } items-start`}
              >
                {!isSender && (
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex justify-center items-center mr-2">
                    {msg.senderFirstname?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-sm max-w-xs ${
                    isSender
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {msg.senderFirstname}{" "}
                    <span className="ml-2 text-gray-400">
                      {new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Box */}
        <div className="p-4 border-t flex items-center gap-3 bg-white">
          <button className="text-gray-500 hover:text-blue-500">
            <FaSmile className="text-2xl" />
          </button>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 flex items-center"
            onClick={sendMessage}
          >
            <IoSendSharp className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
