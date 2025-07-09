'use client';
import { useEffect, useState } from 'react';

const TypewriterText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 110);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypewriterText;
