import { Link } from "preact-router/match";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/useHome">Use Home</Link>
      <Link href="/todos">Todo</Link>
      <Link href="/globalTodos">Global Todos</Link>
      <Link href="/theme">Theme</Link>
    </nav>
  );
};

export default Navbar;
