const Home = ({ onStartConversation, onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4">
        <div className="header-avatar-bg w-24 h-24 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h1a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
        </div>
      <h2 className="text-4xl font-light text-purple-600 leading-snug">
  Your Daily Mental Wellness Companion
</h2>



      <div className="mt-8 space-x-2">
  <button
    onClick={() => onSuggestionClick("Feeling anxious")}
    className="px-4 py-2 text-sm rounded-full text-white shadow-md bg-gradient-to-r from-purple-500 to-indigo-400 hover:opacity-90 transition"
  >
    Feeling anxious
  </button>

  <button
    onClick={() => onSuggestionClick("Need to relax")}
    className="px-4 py-2 text-sm rounded-full text-white shadow-md bg-gradient-to-r from-fuchsia-400 to-purple-300 hover:opacity-90 transition"
  >
    Need to relax
  </button>

  <button
    onClick={() => onSuggestionClick("Can't sleep")}
    className="px-4 py-2 text-sm rounded-full text-purple-900 shadow-md bg-gradient-to-r from-violet-300 to-purple-200 hover:opacity-90 transition"
  >
    Can't sleep
  </button>
</div>


      <button
        onClick={onStartConversation}
        className="home-start-btn mt-8 px-8 py-3 text-white bg-purple-600 font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        Start a Conversation
      </button>

    </div>
  );
};
export default Home;
