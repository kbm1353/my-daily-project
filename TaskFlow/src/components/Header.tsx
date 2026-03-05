interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => (
  <header className="flex justify-between items-center w-full">
    <h1 className="text-3xl font-black text-blue-600 tracking-tighter">
      TaskFlow
    </h1>
    <button
      onClick={onLogout}
      className="text-slate-400 hover:text-red-500 font-medium text-sm transition-colors"
    >
      Logout
    </button>
  </header>
);

export default Header;
