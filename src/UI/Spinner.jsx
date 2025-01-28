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
export const Spinner = ({
  size = "w-6 h-6",
  color = "border-primary-light",
}) => {
  return (
    <div
      className={`animate-spin ${size} border-4 border-t-transparent rounded-full ${color}`}
      style={{
        borderColor: "#3B4D61", // Light blue for other edges
        borderTopColor: "transparent", // Transparent for top edge
      }}
    ></div>
  );
};

export default FullPageSpinner;
