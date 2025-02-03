'use client';

import type React from 'react';
import { useState } from 'react';

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code: string;
}

interface FeatureSelectorProps {
  features: FeatureOption[];
}

export const ExampleGrid: React.FC<FeatureSelectorProps> = ({ features }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-5">
      <div className="sticky top-[var(--header-height)] border-b bg-background md:col-span-2 md:border-r md:border-b-0 dark:border-neutral-800">
        <div className="feature-btn-container flex overflow-x-auto p-4 pb-2 md:flex-col">
          {features.map((option, index) => (
            <button
              type="button"
              key={option.id}
              onClick={() => setSelectedIndex(index)}
              className={`mr-2 mb-2 w-64 flex-shrink-0 rounded border p-4 text-left last:mr-0 md:mr-0 md:w-full dark:border-neutral-800 ${
                selectedIndex === index ? 'bg-accent/70' : 'hover:bg-muted/50'
              }`}
            >
              <h3 className="font-medium tracking-tight">{option.title}</h3>
              <p className="text-muted-foreground text-sm">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        {features[selectedIndex]?.code}
      </div>
    </div>
  );
};
