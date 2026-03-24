type Props = {
  error?: any;
  refetch?: () => void;
};

const Error = ({ error, refetch }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center my-10 bg-[#1a1d23] border border-red-500/30 py-10 px-5 rounded-2xl text-gray-300 shadow-2xl">
      <div className="bg-red-500/10 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      </div>

      <div className="space-y-1">
        <h3 className="text-red-500 font-bold text-lg">Oops! Something went wrong</h3>
        <p className="text-sm opacity-80">
          {error?.response?.data?.message ||
            error?.message ||
            "An unexpected error occurred."}
        </p>
      </div>

      <p className="text-xs text-gray-500">Please try again later or contact support.</p>

      {refetch && (
        <button
          className="mt-2 bg-white/5 border border-white/10 py-2 px-6 rounded-xl shadow-lg hover:bg-white/10 hover:border-red-500/50 transition-all text-white font-medium"
          onClick={refetch}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;