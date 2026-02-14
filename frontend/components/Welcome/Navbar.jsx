const Navbar = () => {
  return (
    <header className="py-8">
      <nav className="flex justify-between items-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Pawfect<span className="text-secondary">.</span>
        </h1>

        <div className="btn-container">
          <button className="primary-btn">Sign up</button>

          <button className="secondary-btn">Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
