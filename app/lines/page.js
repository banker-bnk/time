import { withPageAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';

import { getLines, getTurns } from '../../app/dao';
import LinesList from '@/components/Lines-list';

export default withPageAuthRequired(async function LinesPage() {
  const { accessToken } = await getAccessToken();
  const { user: { sub } } = await getSession();
  const linesData = await getLines(accessToken);

  const userTurnsData = await getTurns(accessToken);

  return (
    <LinesList lines = {linesData} userTurns = {userTurnsData}/>
  );

}, { returnTo: '/lines' });
