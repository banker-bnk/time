import { withPageAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';
import LineManager from "../../../components/lines-manager";

export default withPageAuthRequired(async function LinesPage() {
  const { accessToken } = await getAccessToken();

  return (
    <LineManager/>
  );
}, { returnTo: '/lines' });
