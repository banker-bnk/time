import { withPageAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { getLine, getTurns } from '../../../app/dao';
import LineDetail from '@/components/Lines-detail';

export default withPageAuthRequired(async function LinePage({ params }) {
  const { id } = params;
  const { accessToken } = await getAccessToken();

  const lineData = await getLine(id, accessToken); // Pass the line ID to the getLine function
  const userTurnsData = await getTurns(accessToken);

  console.log("USER TURNS SERVER: " + JSON.stringify(userTurnsData));

  return (
    <LineDetail line={lineData} turns={userTurnsData} />
  );
}, { returnTo: '/lines' });
