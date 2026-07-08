import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const fetchedMessages = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message.");
    }
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-2xl font-extrabold text-navy">Messages & Enquiries</h2>
        <span className="bg-saffron text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {messages.length} Total
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
          <p className="text-gray-500 font-medium">No messages found. When someone fills out the contact form, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map(msg => (
            <div key={msg.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row relative group hover:shadow-md transition-shadow">
              
              {/* Left Accent Bar */}
              <div className="hidden md:block w-1.5 bg-gradient-to-b from-navy to-saffron" />

              <div className="p-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-navy">{msg.subject}</h3>
                    <p className="text-sm text-gray-500">
                      From: <span className="font-semibold text-gray-800">{msg.name}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Unknown Date'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 text-sm whitespace-pre-wrap border border-gray-100">
                  {msg.message}
                </div>

                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 text-navy hover:text-saffron transition-colors">
                    ✉️ {msg.email}
                  </a>
                  <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 text-navy hover:text-saffron transition-colors">
                    📞 {msg.phone}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 p-4 md:w-32 flex md:flex-col justify-end md:justify-start gap-2 border-t md:border-t-0 md:border-l border-gray-100">
                <a 
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="w-full py-2 bg-navy text-white text-xs font-bold rounded text-center hover:bg-opacity-90 transition-opacity"
                >
                  Reply
                </a>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  className="w-full py-2 bg-red-50 text-red-600 text-xs font-bold rounded text-center hover:bg-red-600 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
