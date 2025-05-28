import React, { useState, useRef, useEffect } from "react";
import { X, Send, Settings, TrendingUpDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SimulationForm from "./SimulationForm";
import PredictionForm from "./PredictionForm";
import apiService from "@/services/apiService";
import { MachineDefaults } from "@/types";

interface ChatMessage {
  id: string;
  content:
    | string
    | {
        type: "health_check";
        data: any;
      }
    | {
        type: "prediction_check";
        data: any;
      }
    | {
        type: "simulation_check";
        data: any;
      };
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
  const [showPrediction, setShowPrediction] = useState(false);
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
      response = await apiService.postChatPrompt({
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

  const constructSimulationDataObject = async (changedData) => {
    const originalData = await apiService.getMachineDefaults(
      changedData.machine_id
    );

    let newParams = {};

    const parseIfNumber = (value) => {
      if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        if (!isNaN(parsed)) {
          return parsed;
        }
      }
      return value;
    };

    for (const prop in changedData) {
      if (changedData.hasOwnProperty(prop)) {
        if (prop === "duration") {
          continue;
        }

        const originalValue = parseIfNumber(originalData[prop]);
        const changedValue = parseIfNumber(changedData[prop]);

        if (originalValue !== changedValue) {
          newParams[prop] = changedValue;
        }
      }
    }

    const parsedInitialValues = {};
    for (const prop in originalData) {
      if (originalData.hasOwnProperty(prop)) {
        parsedInitialValues[prop] = parseIfNumber(originalData[prop]);
      }
    }

    return {
      machine_id: originalData.machine_id,
      initial_values: parsedInitialValues,
      fixed_parameters: newParams,
      duration_hours: parseIfNumber(changedData.duration),
    };
  };

  const handleSimulationSubmit = async (data: any) => {
    const formattedData = `Simulation Data:
        Machine: ${data.machine_id}
        Air to Fuel Ratio: ${data.afr} 
        Current: ${data.current} Amperes 
        Pressure: ${data.pressure} Pa 
        RPM: ${data.rpm} 
        Temperature: ${data.temperature}°C 
        Vibrations: ${data.vibration_max} 
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
    setShowPrediction(false);

    // Mark message as animation complete after animation duration
    setTimeout(() => {
      setIsSendingMessage(true);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, animationComplete: true } : msg
        )
      );
    }, 300);

    const simulationData = await constructSimulationDataObject(data);
    let response;

    try {
      response = await apiService.postChatPrompt({
        message: "__simulation_run",
        machine_id: selectedMachine.machine_id,
        simulation_data: simulationData,
      });
    } catch (e) {
      console.log(e.message);
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

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === responseMessage.id
              ? { ...msg, animationComplete: true }
              : msg
          )
        );
      }, 300);

      setTimeout(() => {
        const simulationResponseMessage = {
          id: `system-${Date.now()}`,
          content: {
            type: "simulation_check" as const,
            data: response,
          },
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

  const handlePredictionSubmit = async (data: any) => {
    const newMessage = {
      id: `user-${Date.now()}`,
      content: "Prediction for " + data.machine,
      className: "whitespace-pre-line",
      sender: "user" as const,
      timestamp: new Date(),
      animationComplete: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setShowSimulation(false);
    setShowPrediction(false);

    setTimeout(() => {
      setIsSendingMessage(true);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, animationComplete: true } : msg
        )
      );
    }, 300);

    let response;

    try {
      response = await apiService.postChatPrompt({
        message: "__predict_failure",
        machine_id: selectedMachine.machine_id,
      });
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setTimeout(() => {
        const predictionResponseMessage = {
          id: `system-${Date.now()}`,
          content: {
            type: "prediction_check" as const,
            data: response,
          },
          sender: "system" as const,
          timestamp: new Date(),
          animationComplete: false,
        };
        setMessages((prev) => [...prev, predictionResponseMessage]);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === predictionResponseMessage.id
                ? { ...msg, animationComplete: true }
                : msg
            )
          );
        }, 300);
        setIsSendingMessage(false);
      }, 5000);
    }, 1000);
  };

  const handleHealthCheck = async () => {
    const newMessage = {
      id: `user-${Date.now()}`,
      content: "Conduct a system health check.",
      className: "whitespace-pre-line",
      sender: "user" as const,
      timestamp: new Date(),
      animationComplete: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setShowSimulation(false);

    setTimeout(() => {
      setIsSendingMessage(true);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, animationComplete: true } : msg
        )
      );
    }, 300);

    let response;

    try {
      response = await apiService.postChatPrompt({
        message: "__system_health",
      });
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setTimeout(() => {
        const healthResponseMessage = {
          id: `system-${Date.now()}`,
          content: {
            type: "health_check" as const,
            data: response,
          },
          sender: "system" as const,
          timestamp: new Date(),
          animationComplete: false,
        };
        setMessages((prev) => [...prev, healthResponseMessage]);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === healthResponseMessage.id
                ? { ...msg, animationComplete: true }
                : msg
            )
          );
        }, 300);
        setIsSendingMessage(false);
      }, 5000);
    }, 1000);
  };

  const determineSystemResponse = (message) => {
    const formatAction = (action) => {
      return action
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    const capitalize = (str) =>
      typeof str === "string"
        ? str.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())
        : str;

    if (typeof message.content === "object") {
      if (message.content.type === "health_check") {
        return (
          <div className="text-sm">
            <table className="table-auto border-collapse border border-gray-300 text-left text-sm w-full">
              <thead>
                <tr>
                  <th
                    className="border border-gray-300 px-2 py-1 bg-secondary"
                    colSpan={2}
                  >
                    Agents
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">
                    Data Agent
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {capitalize(message.content.data.agents.data_agent)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">
                    Prediction Agent
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {capitalize(message.content.data.agents.prediction_agent)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">
                    Simulation Agent
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {capitalize(message.content.data.agents.simulation_agent)}
                  </td>
                </tr>
                <tr>
                  <th
                    className="border border-gray-300 px-2 py-1 bg-secondary"
                    colSpan={2}
                  >
                    System Info
                  </th>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">Status</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {capitalize(message.content.data.status)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">
                    Timestamp
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {message.content.data.timestamp}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">Version</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {message.content.data.version}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      } else if (message.content.type === "prediction_check") {
        const response = message.content.data;
        const predictions = response.failure_predictions;
        if (!predictions || predictions.length === 0) {
          return (
            <div className="text-sm">
              Machine {response.machine_id} is healthy. No failures incoming.
            </div>
          );
        }
        return (
          <div className="text-sm">
            <table className="table-auto border-collapse border border-gray-300 text-left text-sm w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="border border-gray-300 px-2 py-1">Failure</th>
                  <th className="border border-gray-300 px-2 py-1">
                    Probability
                  </th>
                  <th className="border border-gray-300 px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-1 py-1">
                      {pred.failure_type}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {(pred.detection.probability * 100).toFixed(2)}%
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {capitalize(pred.action_recommendation.action)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (message.content.type === "simulation_check") {
        const prediction = message.content.data.prediction;
        const machineId = message.content.data.machine_id;
        const failureProbability = (
          prediction.failure_probability * 100
        ).toFixed(2);

        const recommendedAction = formatAction(prediction.recommended_action);

        const mostProbable = prediction.failure_predictions.reduce(
          (max, curr) =>
            curr.detection.probability > max.detection.probability ? curr : max
        );

        const failureType =
          mostProbable.failure_type === "Normal"
            ? "Unknown"
            : mostProbable.failure_type;

        const failurePercentage = (
          mostProbable.detection.probability * 100
        ).toFixed(2);

        return (
          <div className="text-sm space-y-1">
            <p>
              <strong>Failure probability for {machineId}:</strong>{" "}
              {failureProbability}%
            </p>
            <p>
              <strong>Recommended action:</strong> {recommendedAction}
            </p>
            <p>
              <strong>Most probable failure type:</strong> {failureType}
              {failureType !== "Unknown" && ` (${failurePercentage}%)`}
            </p>
          </div>
        );
      }
    } else if (typeof message.content === "string") {
      return <p className="text-sm whitespace-pre-line">{message.content}</p>;
    } else {
      return <></>;
    }
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
      {!(showSimulation || showPrediction) && (
        <>
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
                {determineSystemResponse(message)}
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
        </>
      )}

      <>
        {showSimulation && (
          <div className="flex-1 overflow-y-auto p-3">
            <SimulationForm
              selectedMachine={selectedMachine}
              setSelectedMachine={setSelectedMachine}
              onSubmit={handleSimulationSubmit}
              onCancel={() => setShowSimulation(false)}
            />
          </div>
        )}
        {showPrediction && (
          <div className="flex-1 overflow-y-auto p-3">
            <PredictionForm
              selectedMachine={selectedMachine}
              setSelectedMachine={setSelectedMachine}
              onSubmit={handlePredictionSubmit}
              onCancel={() => setShowPrediction(false)}
            />
          </div>
        )}
      </>

      {/* Input Area */}
      <div className="p-3 border-t border-border bg-card/80">
        <div className="flex gap-4 items-center mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowPrediction(false);
              setShowSimulation(true);
            }}
            className="text-xs px-2 py-1 h-auto bg-muted hover:bg-muted/80 transition-colors"
          >
            <Settings size={14} className="mr-1" />
            Simulation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowSimulation(false);
              setShowPrediction(true);
            }}
            className="text-xs px-2 py-1 h-auto bg-muted hover:bg-muted/80 transition-colors"
          >
            <TrendingUpDown size={14} className="mr-1" />
            Prediction
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleHealthCheck}
            className="text-xs px-2 py-1 h-auto bg-muted hover:bg-muted/80 transition-colors"
          >
            <Activity size={14} className="mr-1" />
            Health
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
