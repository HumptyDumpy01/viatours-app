'use client';

import '@/components/tourDescription/FAQ/QuestionAnswer.scss';
import { useState } from 'react';

type AccordionQAQAType = {
  question: string;
  answer: string;
  // children: ReactNode;
}

export default function AccordionQA({ question, answer }: AccordionQAQAType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleOpen() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <div className="faq__question">
      <h3 onClick={toggleOpen} className="tertiary-heading faq__heading">{question}</h3>
      <div className={`faq__question-paragraph-container margin-top-sm ${!isOpen ? `hidden` : ``}`}>
        <p className="paragraph">{answer}</p>
      </div>
    </div>
  );
}
