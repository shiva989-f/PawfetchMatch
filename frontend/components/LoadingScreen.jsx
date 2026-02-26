const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-24 h-24 border-4 border-t-primary border-secondary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
