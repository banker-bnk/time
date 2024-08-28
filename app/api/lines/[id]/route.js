import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { removeLine } from "../../../dao"

export const DELETE = withApiAuthRequired(async function deleteLineRoute(req, { params }) {
    const { accessToken } = await getAccessToken();
    const { id } = params;

    const deleteLineResponse = await removeLine(id, accessToken);
    return new Response(JSON.stringify(deleteLineResponse));
});