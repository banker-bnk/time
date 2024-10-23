import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getLine, getTurns } from '../../../app/dao';
import LineDetail from '@/components/Lines-detail';

export default withPageAuthRequired(async function LinePage({ params }) {
  const { id } = params;
  const { accessToken } = await getAccessToken();

  const lineData = await getLine(id, accessToken);
  const userTurnsData = await getTurns(accessToken);

  return (
    <LineDetail line={lineData} turns={userTurnsData} />
  );
}, {
  returnTo: (req) => {
    const { id } = req.params;
    return `/lines/${id}`;
  }
});
