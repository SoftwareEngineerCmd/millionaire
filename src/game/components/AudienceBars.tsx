import React, { useEffect, useState } from "react";

interface AudienceBarsProps {
  votes: Record<string, number>; // e.g., { A: 36.67, B: 42.34, C: 15, D: 6 }
  colors?: string[]; // optional custom colors
}

export const AudienceBars: React.FC<AudienceBarsProps> = ({
  votes,
  colors = ["#001f4d", "#001f4d", "#001f4d", "#001f4d"],
}) => {
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const initial: Record<string, number> = {};
    Object.keys(votes).forEach((key) => (initial[key] = 0));
    setHeights(initial);

    setTimeout(() => setHeights(votes), 1000); // animate
  }, [votes]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: "200px", // must be px, not % for container
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {Object.keys(votes).map((key, index) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: `${(heights[key] / 100) * 200}px`, // convert % to px
              background: colors[index % colors.length],
              transition: "height 1s ease",
              borderRadius: "5px",
            }}
          />
          <span style={{ marginTop: "5px" }}>{heights[key]}%</span>
          <span style={{ marginTop: "2px" }}>{key}</span>
        </div>
      ))}
    </div>
  );
};
