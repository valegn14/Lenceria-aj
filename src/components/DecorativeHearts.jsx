import React from 'react';

const hearts = [
  { top: '4%', left: '4%', size: 14, rot: -12, color: '#E8B8C6', op: 0.22 },
  { top: '12%', left: '16%', size: 10, rot: 6, color: '#DFA5B7', op: 0.2 },
  { top: '8%', left: '36%', size: 16, rot: -4, color: '#F3A3C0', op: 0.25 },
  { top: '6%', left: '60%', size: 12, rot: -8, color: '#E8B8C6', op: 0.2 },
  { top: '18%', left: '48%', size: 12, rot: 8, color: '#DFA5B7', op: 0.2 },
  { top: '24%', left: '10%', size: 10, rot: 14, color: '#F7C7D8', op: 0.18 },
  { top: '28%', left: '36%', size: 12, rot: -18, color: '#E8B8C6', op: 0.2 },
  { top: '34%', left: '60%', size: 18, rot: 6, color: '#DFA5B7', op: 0.18 },
  { top: '44%', left: '18%', size: 9, rot: -12, color: '#F3A3C0', op: 0.22 },
  { top: '50%', left: '45%', size: 14, rot: 14, color: '#DFA5B7', op: 0.2 },
  { top: '58%', left: '75%', size: 11, rot: -8, color: '#E8B8C6', op: 0.18 },
  { top: '66%', left: '28%', size: 13, rot: 5, color: '#F7C7D8', op: 0.18 },
  { top: '74%', left: '58%', size: 16, rot: -20, color: '#F3A3C0', op: 0.23 },
  { top: '82%', left: '82%', size: 10, rot: 10, color: '#DFA5B7', op: 0.19 },
  { top: '88%', left: '12%', size: 12, rot: -6, color: '#E8B8C6', op: 0.18 },
  { top: '92%', left: '42%', size: 9, rot: 8, color: '#F7C7D8', op: 0.17 },
  { top: '20%', left: '80%', size: 10, rot: -14, color: '#F3A3C0', op: 0.2 },
  { top: '40%', left: '80%', size: 12, rot: 12, color: '#DFA5B7', op: 0.2 },
  { top: '60%', left: '6%', size: 11, rot: -10, color: '#F7C7D8', op: 0.19 },
  { top: '72%', left: '52%', size: 13, rot: 4, color: '#F3A3C0', op: 0.21 },
];

export default function DecorativeHearts({ fixed = true }) {
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
            // increase fill so hearts stand out on light backgrounds
            fillOpacity: Math.max(0.18, (h.op || 0.18) / 1.5),
            // subtle shadow for contrast
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
