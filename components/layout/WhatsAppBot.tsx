"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    id: number;
    text: string;
    isBot: boolean;
};

const INITIAL_MESSAGES: Message[] = [
    { id: 1, text: "Hello! Welcome to WINI Büromöbel.", isBot: true },
    { id: 2, text: "I'm your automated assistant. How can I help you today?", isBot: true },
];

const QUICK_REPLIES = [
    "Product Catalogue",
    "Find a Dealer",
    "Contact Support",
    "Office Planning",
];

export function WhatsAppBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = { id: Date.now(), text, isBot: false };
        setMessages((prev) => [...prev, newUserMsg]);
        setInputText("");
        setIsTyping(true);

        // Simulate Bot Response
        setTimeout(() => {
            let botResponseText = "Thank you for your message. A WINI expert will get back to you shortly.";

            if (text.toLowerCase().includes("catalogue") || text.toLowerCase().includes("product")) {
                botResponseText = "You can view our product overview in the &apos;Products&apos; section. Would you like a direct link?";
            } else if (text.toLowerCase().includes("dealer")) {
                botResponseText = "We have partners worldwide. Please visit our &apos;Contact&apos; page to find one near you.";
            } else if (text.toLowerCase().includes("planning")) {
                botResponseText = "Our &apos;Solutions&apos; page offers great insights into office planning and concepts.";
            }

            const newBotMsg: Message = { id: Date.now() + 1, text: botResponseText, isBot: true };
            setMessages((prev) => [...prev, newBotMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-white shadow-2xl z-50 overflow-hidden flex flex-col border border-neutral-100 rounded-lg"
                        style={{ height: "500px" }}
                    >
                        {/* Header */}
                        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 fill-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">WINI Support</h3>
                                    <p className="text-xs text-white/80">Online</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 bg-[#ECE5DD] p-4 overflow-y-auto space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm relative ${msg.isBot
                                            ? "bg-white text-neutral-800 rounded-tl-none"
                                            : "bg-[#DCF8C6] text-neutral-900 rounded-tr-none"
                                            }`}
                                    >
                                        {msg.text}
                                        <span className="text-[10px] text-neutral-400 block text-right mt-1">
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length < 4 && (
                            <div className="bg-[#ECE5DD] px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                                {QUICK_REPLIES.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => handleSendMessage(reply)}
                                        className="whitespace-nowrap bg-white/80 hover:bg-white text-neutral-600 text-xs px-3 py-1.5 rounded-full border border-neutral-200 transition-colors"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 text-sm bg-white border-none rounded-full focus:ring-1 focus:ring-[#075E54] outline-none shadow-sm"
                            />
                            <button
                                onClick={() => handleSendMessage(inputText)}
                                className="p-2 bg-[#075E54] text-white rounded-full hover:bg-[#128C7E] transition-colors"
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-[#20bd5a] transition-colors"
            >
                <MessageCircle className="w-7 h-7" />
                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
                    </span>
                )}
            </motion.button>
        </>
    );
}
