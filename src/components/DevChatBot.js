"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

export function DevChatBot() {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return; // avoid empty message

    setChatMessages([...chatMessages, { text: input, sender: "user" }]);
    setInput("");

    // call OpenAI chat API, in future we need to replace to our server backend function
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: data.response, sender: "bot" }, // need a chat history saving solution
    ]);
  };

  return (
    <div
      className="flex flex-col gap-1 items-center justify-center m-4 p-4 rounded-xl"
      style={{ width: 500, height: 600, backgroundColor: "" }}
    >
      <ChatHistoryBox messages={chatMessages} />
      <ChatInputBox input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
}

function ChatInputBox({ input, setInput, handleSend }) {
  return (
    <div
      id="chatTextInputBox"
      className="w-full flex-none items-center rounded-lg p-4"
    >
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="col-span-8 flex justify-center items-center ">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your command here"
          />
        </div>

        <div className="col-span-2 flex items-center">
          <Button onClick={handleSend}>
            <div className="flex flex-row items-center justify-center gap-1">
              <IoIosSend />
              <p>Send</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatHistoryBox({ messages }) {
  return (
    <div
      id="chatTextDebugArea"
      className="flex-1 bg-blue-200 w-full overflow-auto rounded-lg p-4"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-2 my-2 rounded-lg ${
            message.sender === "user" ? "bg-green-200" : "bg-gray-200"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
