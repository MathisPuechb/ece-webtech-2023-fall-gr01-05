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
        <li>
          <Link href="/use-state">
            Use-State
          </Link>
        </li>
        <li>
          <Link href="/login-native">
            Login-Native
          </Link>
        </li>
        <li>
          <Link href="/login-controlled">
            Login-Controlled
          </Link>
        </li>
        <li>
          <Link href="/admin/contacts">
            Contacts list
          </Link>
        </li>
      </ul>
    </div>
  );
}
