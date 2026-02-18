import { useState } from "react";

const cards = [
  { title: "Card 1", content: "Content 1" },
  { title: "Card 2", content: "Content 2" },
  { title: "Card 3", content: "Content 3" },
];

export default function CardSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="card-section">
      {/* Cards */}
      <div
        className="cards-wrapper"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
          >
            <h3>{card.title}</h3>
            <p>{card.content}</p>
          </div>
        ))}
      </div>

      {/* Navigation bubbles */}
      <div className="card-nav">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`bubble ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
