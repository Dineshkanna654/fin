import "./chat.css";
import React, { useState } from "react";
import { Input, Space } from "antd";

const { TextArea } = Input;

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Performing action with input:", inputValue);

      setInputValue("");
      console.log("Leaving the chat");
    }
  };

  const handleTextAreaClick = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/get-all-task/");
        const data = await response.json();
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="custom-input">
        <Space direction="vertical">
          <TextArea
            placeholder="Let me know any task I will do for you!"
            autoSize
            style={{ height: 100, width: 500 }}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onClick={handleTextAreaClick}
          />
          <div className="search-icon"></div>
        </Space>
      </div>
    </div>
  );
};

export default ChatPage;

