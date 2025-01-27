const FullPageSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default FullPageSpinner;
