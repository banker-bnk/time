import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getTurns, addTurn } from "../../dao"

export const GET = withApiAuthRequired(async function getTurnsRoute() {
    const { accessToken } = await getAccessToken();

    const getTurnsResponse = await getTurns(accessToken);
    return new Response(JSON.stringify(getTurnsResponse));
});

export const POST = withApiAuthRequired(async function addTurnRoute(req, res) {
    const { accessToken } = await getAccessToken();
    const reqBody = await req.json();

    const addTurnResponse = await addTurn(reqBody.lineId, accessToken);
    return new Response(JSON.stringify(addTurnResponse));
});