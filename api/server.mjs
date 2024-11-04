// api/server.mjs
import { renderPage } from 'vike/server'

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
    const { url } = req;
    console.log('Request to url:', url);
    if (url === undefined) throw new Error('req.url is undefined');

    console.log('Request Headers:', req.headers);

    // Создаем правильный pageContextInit с заголовками
    const pageContextInit = {
        urlOriginal: url,
        headers: Object.fromEntries(
            Object.entries(req.headers).map(([key, value]) => [
                // Нормализуем имена заголовков
                key.toLowerCase(),
                // Обрабатываем массивы значений
                Array.isArray(value) ? value.join(', ') : value
            ])
        )
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    console.log('httpResponse', !!httpResponse);

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
