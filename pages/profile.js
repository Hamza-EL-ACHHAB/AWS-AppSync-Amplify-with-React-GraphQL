import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { withSSRContext, Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

function Profile({ user }) {
  if (!user) return null;

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Profile</h1>
      <h1 className="font-medium text-gray-500 my-2">
        Username: {user.username}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Email: {user.attributes.email}
      </p>
      <AmplifySignOut />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { props: { user } };
  } catch (error) {
    return { props: {} };
  }
}

export default withAuthenticator(Profile);
