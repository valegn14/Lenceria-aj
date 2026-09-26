import React from 'react';

const buildHearts = (count = 20) => {
  const palette = ['#E8B8C6', '#DFA5B7', '#F3A3C0', '#F7C7D8'];
  const positions = [
    [4, 5], [12, 18], [18, 8], [28, 20], [38, 10], [48, 22], [58, 14], [68, 26],
    [78, 12], [88, 20], [8, 36], [20, 45], [32, 34], [44, 42], [56, 38], [70, 46],
    [82, 32], [90, 44], [12, 60], [26, 70], [40, 58], [54, 64], [68, 72], [82, 62],
    [94, 68], [6, 82], [20, 88], [34, 82], [48, 90], [62, 84], [76, 90], [88, 80],
    [15, 26], [52, 52], [72, 58], [46, 78], [28, 56]
  ];

  return Array.from({ length: count }, (_, i) => {
    const [left, top] = positions[i % positions.length];
    const size = [9, 10, 12, 14, 16, 18][i % 6];
    const rot = [-24, -12, -6, 6, 12, 18, 24][i % 7];
    const color = palette[i % palette.length];
    const op = [0.18, 0.2, 0.22, 0.24, 0.28][i % 5];

    return {
      top: `${top}%`,
      left: `${left}%`,
      size,
      rot,
      color,
      op,
    };
  });
};

export default function DecorativeHearts({ fixed = true, count = 20 }) {
  const hearts = buildHearts(count);
  const containerClass = fixed ? 'pointer-events-none fixed inset-0 z-0 overflow-hidden' : 'pointer-events-none absolute inset-0 z-0 overflow-hidden';
  return (
    <div aria-hidden="true" className={containerClass}>
      {hearts.map((h, i) => (
        <svg
          key={i}
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: h.top,
            left: h.left,
            transform: `translate(-50%, -50%) rotate(${h.rot}deg)`,
            opacity: Math.max(0.34, Math.min(0.85, h.op + 0.34)),
            minWidth: h.size,
            minHeight: h.size,
            fillOpacity: Math.max(0.18, (h.op || 0.18) / 1.5),
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
          }}
          className="select-none"
        >
          <path
            d="M12.1 20.3c-.1 0-.2 0-.3-.1-.7-.4-6.6-4.2-8.6-6.2C.2 11.7 1.1 7.1 4.7 5.3 7 4 9.2 4.5 11 6c.8.8 1.3 1.4 1.6 1.8.3-.4.8-1 1.6-1.8 1.8-1.5 4-2 6.3-1 3.6 1.8 4.5 6.4 1.6 8.7-2 2-7.9 5.8-8.6 6.2-.1.1-.2.1-.3.1z"
            stroke={h.color}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={h.color}
          />
        </svg>
      ))}
    </div>
  );
}
