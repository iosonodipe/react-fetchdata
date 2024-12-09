import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";

type HandlerConfig = {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    res: (request: Request, cookies?: Record<string, string>, params?: Record<string, readonly string[] | string | undefined>) => any;
}

export function createServer(handlerConfig: HandlerConfig[]): void {
    const handlers = handlerConfig.map((config) => {
        return http[config.method || 'get'](config.path, async ({request, cookies, params}) => {
            const response = await config.res(request, cookies, params)

            return new HttpResponse(
                JSON.stringify(response),
                {
                    status: 200, // Imposta il codice di stato HTTP (200 OK di default)
                    headers: {'Content-Type': 'application/json'}, // Imposta il tipo di contenuto
                }
            );
        });
    });
    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });
}