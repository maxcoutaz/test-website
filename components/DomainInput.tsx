
import React, { useState } from 'react';

interface DomainInputProps {
  onSearch: (domain: string) => void;
  isLoading: boolean;
}

const DomainInput: React.FC<DomainInputProps> = ({ onSearch, isLoading }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (domain.trim() && !isLoading) {
      onSearch(domain.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center bg-dark border border-gray-700 rounded-lg p-2 shadow-lg focus-within:ring-2 focus-within:ring-secondary transition-all">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="e.g., myawesomewebsite.com"
          className="w-full sm:flex-grow bg-transparent text-white placeholder-gray-500 text-lg px-4 py-2 outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !domain.trim()}
          className="w-full mt-2 sm:mt-0 sm:w-auto bg-secondary hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-md transition-colors duration-200"
        >
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </div>
    </form>
  );
};

export default DomainInput;
