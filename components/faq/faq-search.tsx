'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  sectionId: string;
  sectionTitle: string;
}

interface FAQSearchProps {
  allFaqs: FAQItem[];
  onSearchResultsAction: (query: string, results: FAQItem[]) => void;
  searchQuery: string;
  setSearchQueryAction: (query: string) => void;
}

export function FAQSearch({ allFaqs, onSearchResultsAction, searchQuery, setSearchQueryAction }: FAQSearchProps) {
  // Process search when user clicks search icon or presses enter
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      onSearchResultsAction('', []);
      return;
    }

    const queryWords = query.toLowerCase().split(' ').filter(Boolean);
    
    const results = allFaqs.filter(faq => {
      const searchText = `${faq.question.toLowerCase()} ${faq.answer.toLowerCase()}`;
      return queryWords.every(word => searchText.includes(word));
    });

    onSearchResultsAction(query, results);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full mb-12">
      <div className="relative">
        <div 
          className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
          onClick={() => handleSearch(searchQuery)}
        >
          <Search className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Ask a question or search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQueryAction(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {searchQuery && (
        <p className="mt-2 text-sm text-gray-500">
          Type to search through our FAQ. Try questions like "How do I install?" or "What's included in Premium?"
        </p>
      )}
    </div>
  );
}
