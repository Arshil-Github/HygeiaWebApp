import React, { useEffect, useState } from "react";
import BackgroundImage from "../assets/background.jpg";

function AITalk() {
  const [isListening, setIsListening] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [buttonText, setButtonText] = useState("Start Talking");
  const [aiResponse, setAiResponse] = useState(""); // Store AI's response

  const [userSpeech, setUserSpeech] = useState("");

  useEffect(() => {
    // Start listening to user input
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      console.log("User said:", spokenText);
      setIsListening(false);

      setButtonText("AI Thinking...");
      setUserSpeech(spokenText);
      // Send the user input to the AI backend after speech ends
      await sendToBackend(spokenText);

      //speak(); // Speak the AI's response
    };
    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      console.log("Speech recognition service has stopped.");
      setIsListening(false);
    };

    setRecognizer(recognition);
    console.log("Recognition started");
  }, []);

  useEffect(() => {
    speak();
  }, [aiResponse]);

  const listen = () => {
    if (recognizer) {
      setIsListening(true);

      setButtonText("User Speaking...");
      setUserSpeech("");

      recognizer.start(); // Start listening
    }
  };

  const stopListening = async () => {
    if (recognizer) {
      recognizer.stop();
    }
  };

  const speak = () => {
    //if (recognizer) recognizer.stop(); // Stop recognition if ongoing
    if (!aiResponse) return;

    setButtonText("AI Speaking...");

    const synth = window.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(aiResponse || "");

      utterance.onend = () => {
        console.log("Speech has finished.");
        setButtonText("Start Talking");
      };
      synth.speak(utterance);
    }
  };

  // Function to send the user input to the backend AI
  const sendToBackend = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:3000/getResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage }), // Send the user's spoken message
      });

      const data = await response.json();

      console.log(data.result);

      if (data.result) {
        setAiResponse(data.result); // Store the AI's response
        setButtonText("AI has responded");
      } else {
        setAiResponse("Error getting response from AI");
      }
    } catch (error) {
      console.error("Error fetching from backend:", error);
      setAiResponse("Error communicating with AI.");
    }
  };

  return (
    <div className="relative h-screen w-screen max-w-[390px]">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900 opacity-75"></div>
      </div>

      {/* Content (Voice Button) */}
      <div className="relative flex items-center justify-center h-full">
        <button
          onClick={isListening ? stopListening : listen}
          className="px-6 py-3 text-white bg-black  shadow-lg  transition-all duration-200 w-4/5 h-20 border-white border-2 opacity-80 tracking-tight uppercase text-2xl font-mono font-extralight hover:bg-blue-600"
        >
          {buttonText}
        </button>

        <div className="absolute bottom-1/4 w-full text-white text-center text-xl font-thin">
          {userSpeech}
        </div>

        <div className="absolute top-1/4 w-full text-white text-center text-xl font-thin">
          {aiResponse}
        </div>
      </div>
    </div>
  );
}

export default AITalk;
