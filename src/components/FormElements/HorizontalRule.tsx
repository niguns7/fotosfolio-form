import React from 'react';

interface HorizontalRuleProps {
  id: string;
}

export const HorizontalRule: React.FC<HorizontalRuleProps> = () => {
  return (
    <div className="my-6">
      <hr className="border-gray-300" />
    </div>
  );
};
