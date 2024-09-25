import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  content: string;
}

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
};

export default Section;
