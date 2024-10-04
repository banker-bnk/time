// app/profile/page.js
import { withPageAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  const { accessToken } = await getAccessToken();

  return <div>Hello {user.name}</div>;
}, { returnTo: '/' })
