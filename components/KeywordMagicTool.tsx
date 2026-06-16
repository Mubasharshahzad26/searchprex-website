'use client';
 
import { useState } from 'react';
import { Search, TrendingUp, DollarSign, Zap, Loader } from 'lucide-react';
 
interface KeywordData {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: number;
}
 
export default function KeywordMagicTool() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywordData, setKeywordData] = useState<KeywordData | null>(null);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
 
  const handleSearchKeyword = async () => {
    setError('');
    setKeywordData(null);
    setLoading(true);
 
    try {
      if (!keyword.trim()) {
        setError('Please enter a keyword');
        setLoading(false);
        return;
      }
 
      // Call API route
      const response = await fetch('/api/keyword-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword.trim(),
        }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch keyword data');
      }
 
      const data = await response.json();
      setKeywordData(data.data);
 
      // Add to search history
      setSearchHistory((prev) => [keyword, ...prev.slice(0, 4)]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleQuickSearch = (term: string) => {
    setKeyword(term);
    setKeywordData(null);
    setError('');
  };
 
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchKeyword();
    }
  };
 
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
 
  const getCompetitionColor = (competition: number) => {
    if (competition < 30) return 'text-green-600';
    if (competition < 70) return 'text-yellow-600';
    return 'text-red-600';
  };
 
  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter keyword... e.g., 'personal injury lawyer'"
              className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 pl-10 text-[#0a0f2e] placeholder-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-[#9ca3af]" />
          </div>
          <button
            onClick={handleSearchKeyword}
            disabled={loading || !keyword}
            className="rounded-lg bg-[#2563eb] px-6 py-3 font-bold text-white transition-all hover:bg-[#1a3c8f] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
 
        {/* Quick Search History */}
        {searchHistory.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-[#64748b] self-center">Recent:</span>
            {searchHistory.map((term, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickSearch(term)}
                className="rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-medium text-[#0a0f2e] transition-all hover:border-[#2563eb] hover:bg-[#2563eb]/5"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
 
      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700 font-medium">Error: {error}</p>
        </div>
      )}
 
      {/* Results Section */}
      {keywordData && (
        <div className="space-y-4">
          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Volume */}
            <div className="rounded-lg border border-[#e5e7eb] p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">
                    Search Volume
                  </p>
                  <p className="text-2xl font-bold text-[#0a0f2e] mt-1">
                    {formatNumber(keywordData.searchVolume)}
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <TrendingUp className="h-5 w-5 text-[#2563eb]" />
                </div>
              </div>
            </div>
 
            {/* CPC */}
            <div className="rounded-lg border border-[#e5e7eb] p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">
                    Avg. CPC
                  </p>
                  <p className="text-2xl font-bold text-[#0a0f2e] mt-1">
                    ${keywordData.cpc.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
 
            {/* Competition */}
            <div className="rounded-lg border border-[#e5e7eb] p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">
                    Competition
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${getCompetitionColor(keywordData.competition)}`}>
                    {keywordData.competition}%
                  </p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </div>
 
            {/* Keyword Info */}
            <div className="rounded-lg border border-[#e5e7eb] p-4 bg-white">
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">
                  Keyword
                </p>
                <p className="text-lg font-bold text-[#0a0f2e] mt-1 break-words">
                  {keywordData.keyword}
                </p>
              </div>
            </div>
          </div>
 
          {/* Insights */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <h4 className="font-bold text-[#0a0f2e] mb-2">💡 SEO Insights:</h4>
            <ul className="text-sm text-blue-900 space-y-1">
              {keywordData.searchVolume > 5000 && (
                <li>✓ High search volume - Good opportunity for traffic</li>
              )}
              {keywordData.cpc > 2 && (
                <li>✓ High CPC - Valuable commercial intent keyword</li>
              )}
              {keywordData.competition < 50 && (
                <li>✓ Low competition - Easier to rank for</li>
              )}
              {keywordData.competition >= 70 && (
                <li>⚠ High competition - More challenging to rank</li>
              )}
            </ul>
          </div>
 
          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => {
                navigator.clipboard.writeText(keywordData.keyword);
                alert('Keyword copied!');
              }}
              className="flex-1 min-w-[150px] rounded-lg border-2 border-[#2563eb] px-4 py-2 font-bold text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white"
            >
              Copy Keyword
            </button>
            <button
              onClick={() => {
                setKeyword('');
                setKeywordData(null);
              }}
              className="flex-1 min-w-[150px] rounded-lg border-2 border-[#64748b] px-4 py-2 font-bold text-[#64748b] transition-all hover:bg-[#64748b] hover:text-white"
            >
              Clear Results
            </button>
          </div>
        </div>
      )}
 
      {/* Empty State */}
      {!keywordData && !error && !loading && (
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-8 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">
            Enter a keyword above to get SEO metrics including search volume, CPC, and competition level.
          </p>
        </div>
      )}
    </div>
  );
}