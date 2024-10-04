import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { removeTurn, getManagedTurns } from "../../../dao"

export const GET = withApiAuthRequired(async function getManagedTurnsRoute(req, { params }) {
    const { accessToken } = await getAccessToken();
    const { id } = params;

    const getTurnsResponse = await getManagedTurns(id, accessToken);
    return new Response(JSON.stringify(getTurnsResponse));
});

export const DELETE = withApiAuthRequired(async function deleteTurnRoute(req, { params }) {
    const { accessToken } = await getAccessToken();
    const { id } = params;

    const deleteTurnResponse = await removeTurn(id, accessToken);
    return new Response(JSON.stringify(deleteTurnResponse));
});