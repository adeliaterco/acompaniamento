import { useState } from "react";

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ questionNumber, totalQuestions, question, options, onAnswer }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    setTimeout(() => {
      onAnswer(options[index].isCorrect);
    }, 1200);
  };

  return (
    <div className="animate-fade-in-up">
      <p className="text-sm font-body tracking-[0.3em] uppercase text-gold-muted text-center mb-8">
        Pregunta {questionNumber} de {totalQuestions}
      </p>
      <h3 className="font-display text-xl md:text-2xl text-foreground text-center mb-8 leading-relaxed">
        {question}
      </h3>
      <div className="space-y-4 max-w-lg mx-auto">
        {options.map((option, index) => {
          let borderClass = "border-gold";
          let bgClass = "bg-secondary";
          if (answered && selected === index) {
            borderClass = option.isCorrect ? "border-green-500" : "border-red-500";
            bgClass = option.isCorrect ? "bg-green-500/10" : "bg-red-500/10";
          } else if (answered && option.isCorrect) {
            borderClass = "border-green-500";
            bgClass = "bg-green-500/10";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`w-full text-left p-5 rounded-lg border ${borderClass} ${bgClass} transition-all duration-300 hover:shadow-gold ${!answered ? 'cursor-pointer hover:border-gold-light' : 'cursor-default'}`}
            >
              <span className="text-primary font-bold mr-3">{option.label})</span>
              <span className="text-foreground">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
