interface ProgressBarProps {
  percentage: number;
  label: string;
}

const ProgressBar = ({ percentage, label }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-body">{label}</span>
        <span className="text-primary font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-gradient rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
