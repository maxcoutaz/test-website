
import React from 'react';
import { DomainInfo } from '../types';
import { CheckCircleIcon, XCircleIcon } from './IconComponents';

interface ResultCardProps {
  domainInfo: DomainInfo;
}

const ResultCard: React.FC<ResultCardProps> = ({ domainInfo }) => {
  const { domainName, isAvailable } = domainInfo;

  const statusClasses = isAvailable
    ? 'border-accent/50 bg-accent/10 text-accent'
    : 'border-danger/50 bg-danger/10 text-danger';
  
  const buttonClasses = isAvailable
    ? 'bg-accent hover:bg-green-500'
    : 'bg-gray-500 cursor-not-allowed';

  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${statusClasses}`}>
      <div className="flex-grow">
        <p className="font-mono text-lg text-white break-all">{domainName}</p>
        <div className="flex items-center gap-2 mt-1">
          {isAvailable ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
          <span className="font-semibold text-sm">{isAvailable ? 'Available' : 'Taken'}</span>
        </div>
      </div>
      <button 
        className={`text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm whitespace-nowrap ${buttonClasses}`}
        disabled={!isAvailable}
      >
        Register Now
      </button>
    </div>
  );
};

export default ResultCard;
