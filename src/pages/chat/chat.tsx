import "./chat.css";
import React, { useState } from "react";
import { Input, Space } from "antd";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const { TextArea } = Input;

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isTextAreaVisible, setTextAreaVisibility] = useState(true);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [userInputHistory, setUserInputHistory] = useState<string[]>([]);

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && inputValue.trim() !== "") {
      e.preventDefault();
      console.log("Performing action with input:", inputValue);

      setUserInputHistory((prevInputHistory) => [
        ...prevInputHistory,
        inputValue,
      ]);
      setChatHistory((prevHistory) => [...prevHistory, `User: ${inputValue}`]);

      fetch("http://localhost:8000/check_condition/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: inputValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          //   console.log('API Response:', data);
          // Handle the response as needed
        })
        .catch((error) => {
          //   console.error('Error:', error);
        });
      setTextAreaVisibility(true);
      setInputValue("");
      fetch("http://localhost:8000/text/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: inputValue }),
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return response.text(); // Log the response body
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          const response = JSON.stringify(data.result, null, 2);
          setApiResponse(response.replace(/"/g, ""));
          setChatHistory((prevHistory) => [...prevHistory, `AI: ${response}`]);
        })
        .catch((error) => {
          console.error("Error:", error);
          setApiResponse(`Error: ${error.message}`);
        });
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="custom-input">
        <Space direction="vertical">
          <TextArea
            variant="outlined"
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
      <div className="chat-history">
      <Paper elevation={3} style={{ margin: '20px', padding: '20px', borderRadius: '10px', maxHeight: 350, display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
          <Typography variant="h6">Chat</Typography>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {chatHistory.map((message, index) => (
              <li key={index}>
                {message.includes('```') ? (
                  <SyntaxHighlighter language="python" style={vscDarkPlus}>
                    {message.replace(/```/g, '')}
                  </SyntaxHighlighter>
                ) : (
                  <p>{message}</p>
                )}
              </li>
            ))}
          </ul>
        </Paper>
      </div>
    </div>
  );
};

export default ChatPage;
