import { useEffect, useRef, useState } from "react";
import { Box, Button, Card, MenuItem, Select, Typography } from "@mui/material";

import {
    FiMic,
    FiStopCircle,
    FiCopy,
    FiTrash2,
    FiDownload,
} from "react-icons/fi";

import SpeechToTextStyles from "../styles/SpeechToTextStyles";

const SpeechToText = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState("en-IN");

    const recognitionRef = useRef(null);
    const finalTextRef = useRef("");

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let interimText = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];

                const transcript = result[0].transcript;

                if (result.isFinal) {
                    finalTextRef.current += transcript + " ";
                } else {
                    interimText += transcript;
                }
            }

            const finalText = finalTextRef.current;

            setText(`${finalText}${interimText}`.trim());
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);

            if (event.error === "not-allowed") {
                alert("Please allow microphone permission.");
            }

            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
            recognitionRef.current = null;
        };
    }, [language]);

    const handleStart = () => {
        if (!recognitionRef.current) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            return;
        }

        try {
            finalTextRef.current = text ? `${text} ` : "";

            recognitionRef.current.start();
        } catch (error) {
            console.error("Start error:", error);
        }
    };

    const handleStop = () => {
        if (!recognitionRef.current) {
            return;
        }

        recognitionRef.current.stop();
        setIsListening(false);
    };

    const handleClear = () => {
        setText("");
        finalTextRef.current = "";
    };

    const handleCopy = async () => {
        if (!text.trim()) {
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            alert("Text copied!");
        } catch (error) {
            console.error("Copy error:", error);
        }
    };

    const handleDownload = () => {
        if (!text.trim()) {
            return;
        }

        const blob = new Blob([text], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "speech-transcription.txt";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const wordCount = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    const characterCount = text.length;

    return (
        <Box sx={SpeechToTextStyles.container}>
            <Card sx={SpeechToTextStyles.card}>
                <Typography sx={SpeechToTextStyles.title}>
                    🎙️ Speech to Text Converter
                </Typography>

                <Typography sx={SpeechToTextStyles.subtitle}>
                    Convert your voice into text instantly.
                </Typography>

                {/* Language */}
                <Box sx={{ marginBottom: "20px" }}>
                    <Typography
                        sx={{
                            color: "#aaa",
                            fontSize: "13px",
                            marginBottom: "8px",
                        }}
                    >
                        Language
                    </Typography>

                    <Select
                        value={language}
                        onChange={(event) => {
                            if (isListening) {
                                recognitionRef.current?.stop();
                            }

                            setLanguage(event.target.value);
                        }}
                        size="small"
                        sx={{
                            minWidth: "200px",
                            color: "#fff",
                            background: "#0d0d15",

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(255,255,255,0.15)",
                            },

                            "& .MuiSvgIcon-root": {
                                color: "#fff",
                            },
                        }}
                    >
                        <MenuItem value="en-IN">English (India)</MenuItem>
                        <MenuItem value="en-US">English (US)</MenuItem>
                        <MenuItem value="ta-IN">Tamil</MenuItem>
                        <MenuItem value="hi-IN">Hindi</MenuItem>
                    </Select>
                </Box>

                {/* Text Area */}
                <textarea
                    value={text}
                    onChange={(event) => {
                        setText(event.target.value);
                        finalTextRef.current = event.target.value;
                    }}
                    placeholder="Start speaking and your text will appear here..."
                    style={SpeechToTextStyles.textArea}
                />

                {/* Status */}
                <Box sx={SpeechToTextStyles.status}>
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: isListening ? "#ff3b30" : "#777",
                        }}
                    />

                    {isListening ? "Listening..." : "Ready to listen"}
                </Box>

                {/* Actions */}
                <Box sx={SpeechToTextStyles.actions}>
                    {!isListening ? (
                        <Button
                            variant="contained"
                            startIcon={<FiMic />}
                            onClick={handleStart}
                        >
                            Start Recording
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<FiStopCircle />}
                            onClick={handleStop}
                        >
                            Stop Recording
                        </Button>
                    )}

                    <Button
                        variant="outlined"
                        startIcon={<FiCopy />}
                        onClick={handleCopy}
                        disabled={!text}
                    >
                        Copy
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<FiTrash2 />}
                        onClick={handleClear}
                        disabled={!text}
                    >
                        Clear
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<FiDownload />}
                        onClick={handleDownload}
                        disabled={!text}
                    >
                        Download
                    </Button>
                </Box>

                {/* Stats */}
                <Box sx={SpeechToTextStyles.stats}>
                    <Typography>
                        Words:{" "}
                        <span style={SpeechToTextStyles.statValue}>
                            {wordCount}
                        </span>
                    </Typography>

                    <Typography>
                        Characters:{" "}
                        <span style={SpeechToTextStyles.statValue}>
                            {characterCount}
                        </span>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default SpeechToText;