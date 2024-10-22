import { withPageAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';
import LinesContainer from "../../components/lines-container"

import { getLines, getLinesAll, getManagedTurns, getTurns } from '../../app/dao';

export default withPageAuthRequired(async function LinesPage() {
  const { accessToken } = await getAccessToken();
  const { user: { sub } } = await getSession();
  const linesData = await getLines(accessToken);

  const userTurnsData = await getTurns(accessToken);
  const managedTurnsData = await getManagedTurns("99", accessToken); //de donde sacamos este lineId

  return (
    <LinesContainer 
      accessToken={accessToken}
      lines={linesData}
      userTurns={userTurnsData}
      managedTurns={managedTurnsData}
      userId={sub}
    />
  );

}, { returnTo: '/lines' });
