import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getLinesAll } from "../../../dao"

export const GET = withApiAuthRequired(async function getLinesRoute() {
    const { accessToken } = await getAccessToken();

    const getLinesResponse = await getLinesAll(accessToken);
    return new Response(JSON.stringify(getLinesResponse));
});