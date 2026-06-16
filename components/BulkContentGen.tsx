'use client';
 
import { useState } from 'react';
import { Loader } from 'lucide-react';
 
export default function BulkContentGen() {
  const [prompt, setPrompt] = useState('');
  const [numberOfPieces, setNumberOfPieces] = useState(1);
  const [contentType, setContentType] = useState('blog-post');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');
 
  const handleGenerateContent = async () => {
    setError('');
    setGeneratedContent('');
    setLoading(true);
 
    try {
      // Call API route (server-side where env vars are safe)
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          numberOfPieces,
          contentType,
        }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }
 
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      alert('Content copied to clipboard!');
    }
  };
 
  const handleDownloadContent = () => {
    if (generatedContent) {
      const element = document.createElement('a');
      const file = new Blob([generatedContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `generated-content-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };
 
  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-bold text-[#0a0f2e] mb-2">
            Content Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your content prompt here... e.g., 'Personal injury lawyer tips for car accident cases'"
            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#0a0f2e] placeholder-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            rows={4}
          />
        </div>
 
        {/* Number of Pieces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#0a0f2e] mb-2">
              Number of Pieces
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={numberOfPieces}
              onChange={(e) => setNumberOfPieces(parseInt(e.target.value))}
              className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#0a0f2e] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>
 
          {/* Content Type */}
          <div>
            <label className="block text-sm font-bold text-[#0a0f2e] mb-2">
              Content Type
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#0a0f2e] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="blog-post">Blog Post</option>
              <option value="landing-page">Landing Page</option>
              <option value="meta-description">Meta Description</option>
              <option value="title-tag">Title Tag</option>
              <option value="social-media">Social Media Post</option>
              <option value="faq">FAQ Answer</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* Generate Button */}
      <button
        onClick={handleGenerateContent}
        disabled={loading || !prompt}
        className="w-full rounded-lg bg-[#2563eb] px-6 py-3 font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
 
      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700 font-medium">Error: {error}</p>
        </div>
      )}
 
      {/* Generated Content Section */}
      {generatedContent && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#0a0f2e] mb-2">
              Generated Content
            </label>
            <div className="rounded-lg border border-[#e5e7eb] bg-[#f8f9fa] p-4 max-h-96 overflow-y-auto">
              <p className="text-[#0a0f2e] whitespace-pre-wrap text-sm leading-relaxed">
                {generatedContent}
              </p>
            </div>
          </div>
 
          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleCopyContent}
              className="flex-1 min-w-[150px] rounded-lg border-2 border-[#2563eb] px-4 py-2 font-bold text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white"
            >
              Copy Content
            </button>
            <button
              onClick={handleDownloadContent}
              className="flex-1 min-w-[150px] rounded-lg border-2 border-[#2563eb] px-4 py-2 font-bold text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white"
            >
              Download
            </button>
            <button
              onClick={() => setGeneratedContent('')}
              className="flex-1 min-w-[150px] rounded-lg border-2 border-[#64748b] px-4 py-2 font-bold text-[#64748b] transition-all hover:bg-[#64748b] hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      )}
 
      {/* Info Message */}
      {!generatedContent && !error && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-blue-700">
            💡 Enter your content prompt above and click "Generate Content" to create SEO-optimized content using AI.
          </p>
        </div>
      )}
    </div>
  );
}
 