const ExpandableButton = ({ icon, text }) => {
  return (
    <button className="flex items-center justify-start w-[45px] h-[45px] border-none rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[2px_2px_10px_rgba(0,0,0,0.199)] bg-primary hover:w-[150px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px] group hover:pl-3">
      {/* Icon Container */}
      <div className="sign flex items-center justify-center  w-full h-full transition-all duration-300 group-hover:justify-start group-hover:w-[30%] ">
        {icon}
      </div>
      {/* Text Container */}
      <span className="absolute right-0  opacity-0 text-white text-[1em] transition-all duration-300 group-hover:opacity-100 group-hover:right-[20px] group-hover:w-auto">
        {text}
      </span>
    </button>
  );
};

export default ExpandableButton;
