import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex justify-center">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            Index
          </Link>
        </li>
        <li>
          <Link href="/articles">
            Articles
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            Contacts
          </Link>
        </li>
      </ul>
    </div>
  );
}
