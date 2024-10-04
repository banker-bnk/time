import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { addLine, getLines, removeLine } from "../../dao"

export const POST = withApiAuthRequired(async function addLineRoute(req, res) {
    const { accessToken } = await getAccessToken();
    const reqBody = await req.json();

    const addLineResponse = await addLine(reqBody.name, accessToken);
    return new Response(JSON.stringify(addLineResponse));
});

export const GET = withApiAuthRequired(async function getLinesRoute() {
    const { accessToken } = await getAccessToken();

    const getLinesResponse = await getLines(accessToken);
    return new Response(JSON.stringify(getLinesResponse));
});