import React, { useState, useRef, useEffect } from "react";
import { X, Send, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SimulationForm from "./SimulationForm";
import chatService from "@/services/chatService";
import { MachineDefaults } from "@/types";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
  animationComplete?: boolean;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const systemMessages = [
  "Hello! How can I help you today?",
  "You can use the Simulation button to run a machine simulation.",
  "Need help with model training or data management?",
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSimulation, setShowSimulation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMachine, setSelectedMachine] = useState<MachineDefaults>();
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: systemMessages[0],
          sender: "system",
          timestamp: new Date(),
          animationComplete: true,
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showSimulation]);

  useEffect(() => {
    console.log("🔍 Message is sending:", isSendingMessage);
  }, [isSendingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
      animationComplete: false,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Mark message as animation complete after animation duration
    setTimeout(() => {
      setTimeout(() => setIsSendingMessage(true), 700);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newUserMessage.id
            ? { ...msg, animationComplete: true }
            : msg
        )
      );
    }, 300);

    let response;

    try {
      response = await chatService.postChatPrompt({
        message: inputValue,
        machine_id: "",
        simulation_data: {},
      });
    } catch (err) {
      response = err.message;
    } finally {
      setIsSendingMessage(false);
    }

    // adding response after a short delay
    setTimeout(() => {
      const newSystemMessage = {
        id: `system-${Date.now()}`,
        content: (response as any).response,
        sender: "system" as const,
        timestamp: new Date(),
        animationComplete: false,
      };
      setMessages((prev) => [...prev, newSystemMessage]);

      // Mark message as animation complete after animation duration
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newSystemMessage.id
              ? { ...msg, animationComplete: true }
              : msg
          )
        );
      }, 300);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSimulationSubmit = async (data: any) => {
    const formattedData = `Simulation Data:
      Machine: ${data.machine}
      Air to Fuel Ratio: ${data.airToFuelRatio} 
      Current: ${data.current} Amperes 
      Pressure: ${data.pressure} Pa 
      RPM: ${data.rpm} 
      Temperature: ${data.temperature}°C 
      Vibrations: ${data.vibrationAmplitude} 
      Duration: ${data.duration}
    `;

    const newMessage = {
      id: `user-${Date.now()}`,
      content: formattedData,
      className: "whitespace-pre-line",
      sender: "user" as const,
      timestamp: new Date(),
      animationComplete: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setShowSimulation(false);

    // Mark message as animation complete after animation duration
    setTimeout(() => {
      setIsSendingMessage(true);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, animationComplete: true } : msg
        )
      );
    }, 300);

    // this is the response TODO:TODO:TODO:
    let response;

    try {
      response = await chatService.postChatPrompt({
        message: "__simulation_run",
        machine_id: selectedMachine.machine_id,
        simulation_data: selectedMachine,
      });

      console.log(response);
    } catch (e) {
      console.log(e.message)
    }

    // Simulate response
    setTimeout(() => {
      const responseMessage = {
        id: `system-${Date.now()}`,
        content: "Simulation data received. Running simulation...",
        sender: "system" as const,
        timestamp: new Date(),
        animationComplete: false,
      };
      setMessages((prev) => [...prev, responseMessage]);

      // Mark system message as animation complete after animation duration
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === responseMessage.id
              ? { ...msg, animationComplete: true }
              : msg
          )
        );
      }, 300);

      //FIXME: second response
      setTimeout(() => {
        const simulationResponseMessage = {
          id: `system-${Date.now()}`,
          content: "This is the simulation response. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          sender: "system" as const,
          timestamp: new Date(),
          animationComplete: false,
        };
        setMessages((prev) => [...prev, simulationResponseMessage]);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === simulationResponseMessage.id
                ? { ...msg, animationComplete: true }
                : msg
            )
          );
        }, 300);
        setIsSendingMessage(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div
      className={cn(
        "fixed right-4 bottom-20 w-80 md:w-96 h-[500px] bg-card rounded-lg shadow-xl border border-border z-50 flex flex-col transition-all duration-300",
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-gradient-to-r from-hpe-green/90 to-hpe-green/70 text-white rounded-t-lg">
        <h3 className="text-lg font-medium">AI Assistant</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-white hover:bg-white/20"
        >
          <X size={18} />
        </Button>
      </div>

      {/* Messages Area */}
      {!showSimulation ? (
        <div
          className="flex-1 overflow-y-auto p-3 space-y-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[75%] rounded-lg p-3 break-words transition-all duration-300",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-auto whitespace-pre-line"
                  : "bg-muted text-foreground",
                !message.animationComplete && "opacity-0 translate-y-2",
                message.animationComplete && "opacity-100 translate-y-0"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
          {isSendingMessage && (
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3">
          <SimulationForm
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
            onSubmit={handleSimulationSubmit}
            onCancel={() => setShowSimulation(false)}
          />
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-border bg-card/80">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSimulation(true)}
            className="text-xs px-2 py-1 h-auto bg-muted hover:bg-muted/80 transition-colors"
          >
            <Settings size={14} className="mr-1" />
            Simulation
          </Button>
        </div>

        {!showSimulation && (
          <div className="flex items-center gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none border rounded-md p-2 h-10 text-sm bg-background focus:ring-1 focus:ring-hpe-green focus:border-hpe-green transition-all outline-none"
              rows={1}
            />
            <Button
              onClick={handleSend}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-hpe-green text-white hover:bg-hpe-green/90 border-none"
            >
              <Send size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
