import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [userName, setUserName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 1. Setup SignalR Connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    // 2. Start the connection and register event
    newConnection.start()
      .then(() => {
        console.log("Connected to Live Chat!");

        newConnection.on("ReceiveMessage", (user, message) => {
          setMessages(prev => [...prev, { user, message }]);
        });
      })
      .catch(err => console.error("SignalR Connection Error: ", err));

    return () => {
      newConnection.stop();
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setHasJoined(true);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (connection && currentMessage.trim() && hasJoined) {
      try {
        await connection.send("SendMessage", userName, currentMessage);
        setCurrentMessage('');
      } catch (e) {
        console.error("Sending message failed: ", e);
      }
    }
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 relative flex items-center justify-center">
      {/* Background Effect */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto relative z-10 glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-space"
          >
            Live <span className="text-gradient">Chat</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mt-4 font-outfit text-lg"
          >
            Connect directly in real-time. Say hello!
          </motion.p>
        </div>

        <div className="overflow-hidden bg-darker/30 border border-white/10 rounded-2xl relative min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {!hasJoined ? (
              <motion.form
                key="join-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleJoin}
                className="m-auto text-center p-8 w-full max-w-md"
              >
                <div className="mb-6 relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                  <input
                    type="text"
                    className="w-full bg-darker/80 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white font-outfit outline-none focus:border-primary transition-colors focus:shadow-[0_0_15px_rgba(138,43,226,0.3)]"
                    placeholder="Enter your name to start..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold font-space text-white shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-shadow duration-300 flex justify-center items-center gap-2 text-lg"
                >
                  Start Chat
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="chat-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-[450px] w-full"
              >
                {/* Chat History */}
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 font-outfit">
                  {messages.length === 0 && (
                    <div className="m-auto text-gray-500 italic text-center">
                      Connection established. Send a message to start!
                    </div>
                  )}
                  {messages.map((msg, i) => {
                    const isMe = msg.user === userName;
                    const isAdmin = msg.user === "Hemangi";

                    return (
                      <div
                        key={i}
                        className={`flex flex-col max-w-[75%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
                      >
                        <span className={`text-xs mb-1 font-space ${isAdmin ? 'text-primary' : 'text-gray-400'}`}>
                          {msg.user}
                        </span>
                        <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-primary text-white rounded-br-sm' : isAdmin ? 'bg-darker border border-primary text-white rounded-bl-sm shadow-[0_0_10px_rgba(138,43,226,0.2)]' : 'bg-darker border border-white/10 text-gray-200 rounded-bl-sm'}`}>
                          {msg.message}
                        </div>
                      </div>
                    )
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-darker/80 border-t border-white/10">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-darker border border-white/20 rounded-xl px-4 py-3 text-white font-outfit outline-none focus:border-primary transition-colors"
                      placeholder="Type a message..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-shadow duration-300 flex justify-center items-center"
                    >
                      <FiSend />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
