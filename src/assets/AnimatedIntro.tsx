type AnimatedIntroProps = {
  text: string;
  exiting: boolean;
  onLettersDone: () => void;
  onExitDone: () => void;
};

const AnimatedIntro = ({
  text,
  exiting,
  onLettersDone,
  onExitDone,
}: AnimatedIntroProps) => {
  const letters = text.split("");

  return (
    <div
      className={`heading-container ${exiting ? "exit" : ""}`}
      onAnimationEnd={(e) => {
        // only react to the container's exit animation
        if (exiting && e.currentTarget === e.target) {
          onExitDone();
        }
      }}
    >
      <h1 className="animated-text-heading">
        {letters.map((char, index) => {
          const isLast = index === letters.length - 1;

          return (
            <span
              key={index}
              className="animated-text-char"
              style={{ animationDelay: `${index * 0.075}s` }}
              onAnimationEnd={isLast ? onLettersDone : undefined}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

export default AnimatedIntro;
