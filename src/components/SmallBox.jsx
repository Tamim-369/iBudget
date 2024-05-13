const SmallBox = (props) => {
  return (
    <div className="budget w-full bg-gray-50 border-solid border-2 rounded-xl mx-3 border-gray-300 p-4 flex  items-center text-neutral-950 font-mono text-sm sm:mx-1 sm:mb-3 mb-4 justify-between px-5">
      <div>{props.name}:</div>
      <div>${props.amount}</div>
    </div>
  );
};

export default SmallBox;
