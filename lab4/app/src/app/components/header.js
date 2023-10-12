import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contacts">Contacts</Link>
        <Link href="/articles">Articles</Link>
      </nav>
    </header>
  );
};

export default Header;