// api/server.mjs
import { renderPage } from 'vike/server'

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
    if (req.url.endsWith('.pageContext.json')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // год
    }

    const { url } = req;
    if (url === undefined) throw new Error('req.url is undefined');

    const pageContextInit = {
        urlOriginal: url,
        headers: Object.fromEntries(
            Object.entries(req.headers).map(([key, value]) => [
                key.toLowerCase(),
                Array.isArray(value) ? value.join(', ') : value
            ])
        )
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) {
        res.statusCode = 200;
        res.end();
        return;
    }

    const { body, statusCode, headers } = httpResponse;
    res.statusCode = statusCode;

    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.end(body);
}
