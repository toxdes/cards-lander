"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, Check } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface QuizModalProps {
  onClose: () => void;
  onDownload: () => void;
}

const questions = [
  {
    id: "q1",
    text: "Are you AI?",
    type: "radio",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" },
    ],
    correctAnswer: ["a", "b"], // Any answer is correct
  },
  {
    id: "q2",
    text: "Select all that apply:",
    type: "checkbox",
    options: [
      { id: "a", label: "I know all the apps I have installed on my phone, and I actively look for suspicious apps." },
      { id: "b", label: "I don't know what apps are on my phone." },
      { id: "c", label: "I am paranoid about about installing apps from sources other than official stores." },
      { id: "d", label: "I have not rooted/jailbroken my phone and if I have I am fine with someone stealing my data." },
    ],
    correctAnswer: ["a", "c", "d"],
  },
  {
    id: "q3",
    text: "Select all that apply:",
    type: "checkbox",
    options: [
      { id: "a", label: "I know what 'permissions' of the apps are and I instantly know if any app is asking for unnecessary permissions." },
      { id: "b", label: "I don't know what permissions are." },
    ],
    correctAnswer: ["a"],
  },
  {
    id: "q4",
    text: "Select all that apply:",
    type: "checkbox",
    options: [
      { id: "a", label: 'On windows, I always do "next"->"next"->"next"->"install"->"Yes" without reading the content of "Yes" "No" dialog.' },
      { id: "b", label: "I know what giving administrative access to an app means, and I am hesitant to give admin access to random apps i download from the internet." },
    ],
    correctAnswer: ["b"],
  },
];

export function QuizModal({ onClose, onDownload }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    q1: [],
    q2: [],
    q3: [],
    q4: [],
  });
  const [isQuizPassed, setIsQuizPassed] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const isMobile = useIsMobile();

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      if (questions[currentQuestionIndex].type === "radio") {
        newAnswers[questionId] = [value];
      } else {
        if (newAnswers[questionId].includes(value)) {
          newAnswers[questionId] = newAnswers[questionId].filter(
            (item) => item !== value
          );
        } else {
          newAnswers[questionId] = [...newAnswers[questionId], value];
        }
      }
      return newAnswers;
    });
  };

  const checkAllAnswers = () => {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers[question.id];
      if (question.id === "q1") {
        if (answer.length === 0) return false;
      } else if (
        JSON.stringify(answer.sort()) !==
        JSON.stringify(question.correctAnswer.sort())
      ) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setIsQuizPassed(checkAllAnswers());
  }, [answers]);

  const handleDownloadClick = () => {
    if (isQuizPassed) {
      onDownload();
    } else {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = answers[currentQuestion.id]?.length > 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-end md:items-center justify-center z-50">
      <div className="bg-[#0A0C10] border-t md:border border-white/20 rounded-t-lg md:rounded-lg p-8 w-full max-w-2xl text-white relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Bum Screener Test</h2>
        <div className="space-y-6">
          <div>
            <p className="font-medium mb-2">{currentQuestion.text}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                    answers[currentQuestion.id]?.includes(option.id)
                      ? "bg-blue-700 border-blue-500"
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                >
                  <input
                    type={currentQuestion.type}
                    name={currentQuestion.id}
                    value={option.id}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.id, option.id)
                    }
                    className="hidden"
                  />
                  {answers[currentQuestion.id]?.includes(option.id) && (
                    <Check className="h-5 w-5 mr-2" />
                  )}
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          {currentQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="font-weight-600 uppercase px-8 bg-white text-black hover:bg-gray-200"
            >
              Previous
            </Button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={!isCurrentQuestionAnswered}
              className="bg-blue-700 hover:bg-blue-800 font-weight-600 uppercase px-8"
            >
              Next
            </Button>
          ) : (
            <div className="relative">
              <Button
                onClick={handleDownloadClick}
                className="bg-blue-700 hover:bg-blue-800 font-weight-600 uppercase px-8"
              >
                Download
              </Button>
              {showErrorPopup && (
                <div
                  className={
                    isMobile
                      ? "fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs rounded py-2 px-4 text-center z-50"
                      : "absolute bottom-full mb-2 w-max bg-red-500 text-white text-xs rounded py-1 px-2"
                  }
                >
                  You are a bum, and a potential security risk to yourself.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
