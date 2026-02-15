"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Safari } from "@/components/ui/device-mockups";
import {
    Send,
    Bot,
    Sparkles,
    ShoppingBag,
    Loader2
} from "lucide-react";

type Message = {
    role: "user" | "bot";
    text: string;
    isTyping?: boolean;
    action?: string;
};

export default function ChatbotDemo() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [step, setStep] = useState(0);

    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

            while (mounted) {
                // Loop reset
                setMessages([]);
                setInputValue("");

                // 1. User Types (1.5s)
                await delay(1000);
                if (!mounted) break;
                typeWriter("Har dere denne i blå, str L?", setInputValue);

                await delay(2000);
                if (!mounted) break;

                // 2. User Sends
                setInputValue("");
                setMessages([{ role: "user", text: "Har dere denne i blå, str L?" }]);

                // 3. Bot "Thinking" + Action
                await delay(500);
                if (!mounted) break;
                setMessages(prev => [...prev, { role: "bot", text: "", isTyping: true, action: "Checking inventory..." }]);

                await delay(1500);
                if (!mounted) break;

                // 4. Bot "Found" + Typing
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs.pop(); // Remove typing
                    return [...newMsgs, { role: "bot", text: "Ett øyeblikk, sjekker lagerstatus..." }];
                });

                await delay(1000);
                if (!mounted) break;

                // 5. Bot Final Reply
                setMessages(prev => [...prev, { role: "bot", text: "Ja! ✅ Vi har 3 stk på lager i Oslo. Vil du reservere en?", action: "In Stock: 3 units" }]);

                // 6. User Types "Ja"
                await delay(3000);
                if (!mounted) break;
                typeWriter("Ja takk!", setInputValue);

                await delay(1000);
                if (!mounted) break;

                setInputValue("");
                setMessages(prev => [...prev, { role: "user", text: "Ja takk!" }]);

                // 7. Bot Confirms
                await delay(500);
                if (!mounted) break;
                setMessages(prev => [...prev, { role: "bot", text: "Den er grei! Ordre #9021 opprettet. Sendes i dag." }]);

                // Loop delay
                await delay(5000);
            }
        };

        runSequence();

        return () => { mounted = false; };
    }, []);

    const typeWriter = (text: string, setter: (s: string) => void) => {
        let i = 0;
        const interval = setInterval(() => {
            setter(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 50);
    };

    return (
        <Safari url="dinbedrift.no/chat" className="h-full">
            <div className="flex flex-col h-[400px] bg-background">
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/20">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center ring-2 ring-white/10">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">Kundeassistent</p>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-xs text-muted-foreground">Alltid tilgjengelig</p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all duration-300",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-br-sm"
                                    : "bg-muted text-muted-foreground rounded-bl-sm border border-border"
                            )}>
                                {msg.isTyping ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        <span className="text-xs italic opacity-70">{msg.action || "Thinking..."}</span>
                                    </div>
                                ) : (
                                    <div>
                                        {msg.action && msg.role === "bot" && (
                                            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-500 mb-1">
                                                <ShoppingBag className="h-3 w-3" />
                                                {msg.action}
                                            </div>
                                        )}
                                        {msg.text}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Welcome Message (Always visible at start) */}
                    {messages.length === 0 && !inputValue && (
                        <div className="text-center mt-10 opacity-50">
                            <Bot className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Hvordan kan jeg hjelpe deg i dag?</p>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-background">
                    <div className="flex items-center gap-2 rounded-xl bg-muted/50 border border-border px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            type="text"
                            value={inputValue}
                            placeholder="Still et spørsmål..."
                            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                            readOnly
                        />
                        <div className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
                            inputValue ? "bg-primary text-primary-foreground scale-100" : "bg-transparent text-muted-foreground scale-90"
                        )}>
                            <Send className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Safari>
    );
}
