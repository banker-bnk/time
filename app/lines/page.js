import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import LinesContainer from '../../components/lines-container';
import { getLines, getTurns } from '../../app/dao';
import { decodeJWT } from '../../utils/decodeJWT';

export default withPageAuthRequired(async function LinesPage() {
  const { accessToken } = await getAccessToken();
  const linesData = await getLines(accessToken);
  const turnsData = await getTurns(accessToken);

  return (
    <LinesContainer
      accessToken={accessToken}
      lines={linesData}
      turns={turnsData}
      userId={decodeJWT(accessToken).payload['https://hasura.io/jwt/claims']['x-hasura-user-id']}
    />
  );
}, { returnTo: '/lines' });
