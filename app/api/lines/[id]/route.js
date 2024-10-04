import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { removeLine, setCurrent } from "../../../dao"

export const DELETE = withApiAuthRequired(async function deleteLineRoute(req, { params }) {
    const { accessToken } = await getAccessToken();
    const { id } = params;

    const deleteLineResponse = await removeLine(id, accessToken);
    return new Response(JSON.stringify(deleteLineResponse));
});

export const POST = withApiAuthRequired(async function setCurrentRoute(req, { params }) {
    const { accessToken } = await getAccessToken();
    const { id } = params;

    const reqBody = await req.json();
    const setCurrentResponse = await setCurrent(id, reqBody.turnId, accessToken);
    return new Response(JSON.stringify(setCurrentResponse));
});