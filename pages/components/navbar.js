import Link from 'next/link';
import React from 'react';
import '../../configureAmplify';
import { useState, useEffect } from 'react';
import { execOnce } from 'next/dist/shared/lib/utils';
import { Auth, Hub } from 'aws-amplify';

const NavBar = () => {
  const [signedUser, setSignedUser] = useState(false);
  useEffect(() => {
    authListener();
  }, []);
  async function authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return setSignedUser(true);
        case 'signOut':
          return setSignedUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedUser(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav
      className="flex justify-center pt-3 pb-3
        space-x-4 border-b bg-cyan-500 border-gray-300"
    >
      {[
        ['Home', '/'],
        ['Create Post', '/create-post'],
        ['Profile', '/profile'],
      ].map(([title, url], index) => (
        <Link href={url} key={index} legacyBehavior>
          <a
            className="rounded-lg px-3 py-2 
            text-slate-700
             font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {' '}
            {title}
          </a>
        </Link>
      ))}
      {signedUser && (
        <Link href="/my-posts" legacyBehavior>
          <a
            className="rounded-lg px-3 py-2 
            text-slate-700
             font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            My Posts
          </a>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
