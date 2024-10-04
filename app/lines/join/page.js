import { withPageAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';
import AvailableLines from "../../../components/lines-picker";

export default withPageAuthRequired(async function LinesPage() {
  const { accessToken } = await getAccessToken();
  const { user: { sub } } = await getSession();

  return (
    <AvailableLines/>
  );
}, { returnTo: '/lines' });
