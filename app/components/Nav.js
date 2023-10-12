import React from 'react';
import Link from 'next/link'

export default function Nav() {
  return (
    <center>
        <ul>
            <li>
                <Link href="/">Index</Link>
            </li>
            <li>
                <Link href="/articles">Articles</Link>
            </li>
            <li>
                <Link href="/About">About</Link>
            </li>
            <li>
                <Link href="/contacts">Contacts</Link>
            </li>
    </ul>  
    </center> 
  );
}