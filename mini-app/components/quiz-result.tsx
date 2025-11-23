"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Props = {
  animal: "cat" | "dog" | "fox" | "hamster" | "horse";
  onRetake: () => void;
};

export default function QuizResult({ animal, onRetake }: Props) {
  const imageSrc = `/${animal}.png`;
  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };
  const title = `You are a ${animalNames[animal]}!`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <img src={imageSrc} alt={animal} width={512} height={512} className="rounded" />
      <Share text={`${title} ${url}`} />
      <Button onClick={onRetake}>Retake Quiz</Button>
    </div>
  );
}
