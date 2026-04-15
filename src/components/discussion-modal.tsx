"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User as UserIcon } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp 
} from "firebase/firestore";

interface DiscussionMessage {
  id: string;
  pathname: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Timestamp | null;
}

interface DiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function DiscussionModal({ isOpen, onClose, pathname }: DiscussionModalProps) {
  const { user, player, signInWithGoogle, signInWithEmail } = useAuth();
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Email Auth State
  const [showEmailAuth, setShowEmailAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to messages for this page
  useEffect(() => {
    if (!isOpen) return;

    const q = query(
      collection(db, "page_discussions"),
      where("pathname", "==", pathname)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: DiscussionMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as DiscussionMessage);
      });
      // Sort client-side to avoid needing a composite index for an MVP
      msgs.sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeA - timeB;
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [isOpen, pathname]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "page_discussions"), {
        pathname,
        playerId: user.uid,
        playerName: player?.displayName || user.displayName || user.email?.split('@')[0] || "Unknown Racer",
        message: newMessage.trim(),
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Failed to post message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-neutral-900 border border-neutral-800 sm:rounded-xl shadow-2xl w-full sm:max-w-md h-[80vh] sm:h-[600px] flex flex-col flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 shrink-0">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Discussion</h3>
                <p className="text-xs text-neutral-400 font-mono truncate max-w-[200px]">
                  {pathname}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-3">
                  <MessagesSquareIcon />
                  <p className="text-sm">No discussion yet on this page.</p>
                  <p className="text-xs">Be the first to start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.playerId === user?.uid;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isMine ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-neutral-400">
                          {msg.playerName}
                        </span>
                        {msg.timestamp && (
                          <span className="text-[9px] text-neutral-600">
                            {msg.timestamp.toDate().toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${
                          isMine
                            ? "bg-red-600 text-white rounded-br-sm"
                            : "bg-neutral-800 text-neutral-200 rounded-bl-sm"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-neutral-800 shrink-0 bg-neutral-900/50">
              {user ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Share an idea, bug, or question..."
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 ring-red-500/50 transition-all"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || isSubmitting}
                    className="bg-red-600 hover:bg-red-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-white p-2 px-3 rounded-lg flex items-center justify-center transition-colors shadow-sm shadow-red-900/20"
                  >
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-2 space-y-3">
                  {!showEmailAuth ? (
                    <>
                      <p className="text-xs text-neutral-400">
                        You must be signed in to join the discussion.
                      </p>
                      <div className="w-full sm:w-auto flex flex-col gap-2">
                        <button
                          onClick={signInWithGoogle}
                          className="w-full bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <UserIcon size={16} />
                          <span>Sign in with Google</span>
                        </button>
                        <button
                          onClick={() => setShowEmailAuth(true)}
                          className="w-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors border border-neutral-700"
                        >
                          Use Email
                        </button>
                      </div>
                    </>
                  ) : (
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsAuthenticating(true);
                        setAuthError("");
                        try {
                          await signInWithEmail(email, password);
                        } catch (err: any) {
                          setAuthError(err.message || "Authentication failed");
                        } finally {
                          setIsAuthenticating(false);
                        }
                      }}
                      className="w-full space-y-2"
                    >
                      <p className="text-xs text-neutral-400 text-center mb-1">
                        Sign in or register an account instantly
                      </p>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-red-500"
                        required
                      />
                      <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-red-500"
                        required
                      />
                      {authError && <p className="text-xs text-red-500 text-center">{authError}</p>}
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setShowEmailAuth(false)}
                          className="flex-1 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isAuthenticating}
                          className="flex-1 bg-white text-black hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                          {isAuthenticating ? "..." : "Sign In / Register"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MessagesSquareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-700 mb-2"
    >
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </svg>
  );
}
