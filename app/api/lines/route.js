import { withApiAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { addLine, getLines } from "../../dao"

export const POST = withApiAuthRequired(async function addLineRoute(req, res) {
    const { accessToken } = await getAccessToken();
    const { user: { sub } } = await getSession();
    const reqBody = await req.json();

    const addLineResponse = await addLine(reqBody.name, accessToken, sub);
    return new Response(JSON.stringify(addLineResponse));
});

export const GET = withApiAuthRequired(async function getLinesRoute() {
    const { accessToken } = await getAccessToken();

    const getLinesResponse = await getLines(accessToken);
    return new Response(JSON.stringify(getLinesResponse));
});