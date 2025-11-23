"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuizResult from "./quiz-result";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

const questions = [
  {
    question: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grain", animal: "horse" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    question: "What is your energy level?",
    options: [
      { text: "Low", animal: "cat" },
      { text: "High", animal: "dog" },
      { text: "Medium", animal: "fox" },
      { text: "Low", animal: "hamster" },
      { text: "High", animal: "horse" },
    ],
  },
  {
    question: "How do you like to communicate?",
    options: [
      { text: "Purr", animal: "cat" },
      { text: "Bark", animal: "dog" },
      { text: "Squeak", animal: "hamster" },
      { text: "Whistle", animal: "fox" },
      { text: "Neigh", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite activity?",
    options: [
      { text: "Nap", animal: "cat" },
      { text: "Play fetch", animal: "dog" },
      { text: "Run", animal: "fox" },
      { text: "Chew", animal: "hamster" },
      { text: "Run fast", animal: "horse" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores({ cat: 0, dog: 0, fox: 0, hamster: 0, horse: 0 });
    setShowResult(false);
  };

  if (showResult) {
    const maxScore = Math.max(...Object.values(scores));
    const winner = Object.entries(scores).find(
      ([, score]) => score === maxScore
    )?.[0] as Animal;
    return <QuizResult animal={winner} onRetake={resetQuiz} />;
  }

  const { question, options } = questions[current];
  const shuffled = options.slice().sort(() => Math.random() - 0.5);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="flex flex-col gap-2">
        {shuffled.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
