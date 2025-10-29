
import React, { useState, useCallback } from 'react';
import { DomainInfo } from './types';
import { checkDomainAvailability } from './services/geminiService';
import DomainInput from './components/DomainInput';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import { GlobeIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [primaryResult, setPrimaryResult] = useState<DomainInfo | null>(null);
  const [suggestions, setSuggestions] = useState<DomainInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (domain: string) => {
    setIsLoading(true);
    setError(null);
    setPrimaryResult(null);
    setSuggestions([]);

    try {
      const result = await checkDomainAvailability(domain);
      setPrimaryResult(result.primary);
      setSuggestions(result.suggestions);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="text-center my-8 p-4 bg-danger/20 text-danger rounded-lg">{error}</div>;
    }
    if (!primaryResult) {
      return (
        <div className="text-center my-12 text-gray-400">
          <GlobeIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-300">Welcome to AI Domain Checker</h2>
          <p className="mt-2">Enter a domain name above to check its availability and get smart suggestions.</p>
        </div>
      );
    }
    return (
      <div className="space-y-8 mt-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Your Searched Domain</h2>
          <ResultCard domainInfo={primaryResult} />
        </div>
        {suggestions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {!primaryResult.isAvailable ? "Here are some AI-powered alternatives:" : "AI Suggestions"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <ResultCard key={suggestion.domainName} domainInfo={suggestion} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-darker font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
            AI Domain Checker
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Find the perfect domain. Instantly check availability and get creative suggestions powered by Gemini.
          </p>
        </header>
        
        <DomainInput onSearch={handleSearch} isLoading={isLoading} />
        
        <div className="mt-8 max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by React, Tailwind CSS, and Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
