import React from 'react';

interface ContentSectionProps {
  content: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ content }) => {
  return (
    <div className="content-section">
      <p>{content}</p>
    </div>
  );
};

export default ContentSection;
