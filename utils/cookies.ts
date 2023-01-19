import { NextApiResponse } from "next";
import { CookieSerializeOptions, serialize } from "cookie";


export const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = { }) => {
    const valueString = (typeof(value) === 'object')? `JSON: ${JSON.stringify(value)}` : String(value);

    if (typeof(options.maxAge) === 'number') {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
    }

    res.setHeader('Set-Cookie', serialize(name, valueString, options));
}