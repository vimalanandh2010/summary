import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiReady, setAiReady] = useState(false);

  // Check if AI is ready
  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat && typeof window.puter.ai.chat === "function") {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);

    return () => clearInterval(checkReady);
  }, []);

  // Summarize function
  const summarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const result = await window.puter.ai.chat(`Please summarize the following text: ${text}`);
      setSummary(result.message?.content || "No summary available");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '24px', textAlign: 'center' }}>
          AI Text Summarizer
      </h1>

<textarea
  style={{
    width: '95%',
    maxWidth: '1200px',
    height: '600px',
    padding: '24px',
    borderRadius: '24px',
    border: '2px solid #3b82f6',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    fontSize: '18px',
    lineHeight: '1.6',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    marginBottom: '20px',
    fontFamily: 'inherit'
  }}
  className="p-5 border border-gray-300 rounded-3xl shadow-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-y transition-all placeholder-gray-400"
  placeholder="Paste your text here..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  disabled={!aiReady}
/>
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
          <button
            onClick={summarize}
            className="flex-1 md:flex-none w-full md:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold rounded-3xl shadow-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!aiReady || loading}
          >
            {loading ? "summarizing" : "Smmarize"}
          </button>

          <button
            onClick={() => {
              setText("");
              setSummary("");
              setError("");
            }}
            className="flex-1 md:flex-none w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-3xl shadow hover:bg-gray-300 transition-all"
          >
            clear
          </button>
        </div>

        {summary && (
          <div className="mt-6 p-6 bg-white border border-gray-200 rounded-3xl shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-semibold text-gray-800">summary:</h2>
            
          
          
          
          
            
            </div>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 w-full text-red-600 font-semibold text-center">
            Error: {error}
          </div>
        )}

        {/* AI Loading Message */}
        {!aiReady && (
          <div className="mt-4 w-full text-gray-500 font-medium text-center">
ai loading  pls  wait
          </div>
        )}
      </div>
  );
}

export default App;