import React, { useState } from 'react';

// Main App component
function App() {
  const [newsText, setNewsText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Simple client-side simulation of fake news detection
  // In a real application, this would involve an API call to a Python backend
  // hosting your trained scikit-learn model.
  const simulateDetection = async (text) => {
    setIsLoading(true);
    setPrediction(null); // Clear previous prediction

    // Simulate network delay
    await new Promise(resolve => setTimeout(Math.random() * 1000 + 500, resolve)); // 0.5 to 1.5 seconds delay

    const lowerText = text.toLowerCase();
    let result = "Uncertain"; // Default to uncertain

    // Very basic keyword-based simulation for demonstration
    // This is NOT the actual ML model logic, just for UI demo
    if (lowerText.includes("cure all diseases") ||
        lowerText.includes("aliens spotted") ||
        lowerText.includes("secret doctors") ||
        lowerText.includes("lizard people") ||
        lowerText.includes("time travel invented") ||
        lowerText.includes("miracle diet pill") ||
        lowerText.includes("shocking revelations")) {
      result = "Fake News";
    } else if (lowerText.includes("scientists confirm") ||
               lowerText.includes("new study shows") ||
               lowerText.includes("government approves") ||
               lowerText.includes("president signed") ||
               lowerText.includes("company announces") ||
               lowerText.includes("astronomers discover") ||
               lowerText.includes("infrastructure bill")) {
      result = "Real News";
    } else if (text.trim() === '') {
      result = "Please enter some news text.";
    } else {
      result = "Cannot determine with simple client-side logic. (Needs ML Model)";
    }

    setIsLoading(false);
    setPrediction(result);
  };

  const handlePredictClick = () => {
    setShowDisclaimer(false); // Hide disclaimer once user interacts
    simulateDetection(newsText);
  };

  const handleClearClick = () => {
    setNewsText('');
    setPrediction(null);
    setIsLoading(false);
    setShowDisclaimer(true); // Show disclaimer again
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 font-inter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Fake News Detector
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-8 font-inter">
          Enter a news article or headline below to get a simulated prediction.
        </p>

        {showDisclaimer && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg mb-6 shadow-sm">
            <p className="font-semibold mb-2">Disclaimer:</p>
            <p className="text-sm">
              This is a **client-side demonstration** using simplified logic. For a real, robust fake news detection,
              you would need to integrate your trained Python Machine Learning model via a **backend server**.
            </p>
          </div>
        )}

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none mb-6 text-gray-800 font-inter resize-y min-h-[120px] shadow-sm"
          placeholder="Paste your news text here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          rows="6"
        ></textarea>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <button
            onClick={handlePredictClick}
            disabled={isLoading || newsText.trim() === ''}
            className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-md transition-all duration-300
              ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg'}`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Detect News'
            )}
          </button>
          <button
            onClick={handleClearClick}
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold text-lg shadow-md hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:shadow-lg"
          >
            Clear
          </button>
        </div>

        {prediction && (
          <div className={`p-5 rounded-lg text-center font-bold text-2xl ${
            prediction === 'Fake News' ? 'bg-red-100 text-red-700 border border-red-300' :
            prediction === 'Real News' ? 'bg-green-100 text-green-700 border border-green-300' :
            'bg-gray-100 text-gray-700 border border-gray-300'
          } shadow-inner transition-all duration-500 ease-in-out`}>
            Prediction: {prediction}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
