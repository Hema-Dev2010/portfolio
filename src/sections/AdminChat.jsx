import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

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
        console.log("Admin connected to SignalR Hub");

        newConnection.on("ReceiveMessage", (user, message) => {
          setMessages(prev => [...prev, { user, message }]);
        });
      })
      .catch(err => console.error("SignalR Connection Error: ", err));

    // Cleanup
    return () => {
      newConnection.stop();
    };
  }, []);

  const sendReply = async (e) => {
    e.preventDefault();
    if (connection && replyMessage.trim()) {
      try {
        await connection.send("SendMessage", "Admin", replyMessage);
        setReplyMessage('');
      } catch (e) {
        console.error("Sending reply failed: ", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-darker text-white p-8 font-outfit">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-space font-bold mb-8 text-gradient">Hemangi's Chat Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Messages List */}
          <div className="flex-1 bg-darker/50 border border-white/10 rounded-2xl p-6 h-[600px] overflow-y-auto flex flex-col gap-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] glass-card">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center m-auto">No messages yet. Waiting for visitors...</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`p-4 rounded-xl max-w-[80%] ${msg.user === 'Admin' ? 'bg-primary/20 border-primary/50 self-end ml-auto' : 'bg-white/5 border-white/10 self-start mr-auto'} border`}>
                  <p className="text-xs text-gray-400 font-space mb-1">{msg.user}</p>
                  <p>{msg.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Reply Form */}
          <div className="w-full md:w-1/3 bg-darker/50 border border-white/10 rounded-2xl p-6 h-fit glass-card shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-space mb-4">Send Reply Broadcast</h2>
            <form onSubmit={sendReply} className="flex flex-col gap-4">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full bg-darker border border-white/10 rounded-xl p-4 text-white resize-none h-32 focus:border-primary outline-none transition-colors"
                placeholder="Type a message to all connected visitors..."
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold font-space hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-shadow"
              >
                Broadcast Reply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
