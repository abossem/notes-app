function Header() {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <h1 className="text-[30px] font-bold">My Notes</h1>
      <button className="bg-[var(--purple-color)] p-3 text-white rounded font-semibold">
        + New Note
      </button>
    </header>
  );
}

export default Header;
