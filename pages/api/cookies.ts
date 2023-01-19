import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../utils/cookies';
import { v4 } from 'uuid';
import { redis } from '../../lib/redis';
import prisma from '../../lib/prisma';
import { USER_PREFIX } from '../../constants/redisPrefixes';


type Data = {
    
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let id = req.cookies['id'];

    if (id) {
        // get items based on id.
        let brianId = await prisma.user.findFirst({ where: { name: "Brian" }});
        if (!(await redis.get(USER_PREFIX + req.cookies.id))) {
            redis.set(USER_PREFIX + req.cookies.id, brianId!.id);
        }

        // console.log(await redis.get(USER_PREFIX + req.cookies.id));
    } else {
        id = v4();
        setCookie(res, 'id', id, { path: '/' })
    }

    res.send(`<h1 style="font-family: sans-serif; color: #212121;">hello, ${ id }</h1><span style="font-family: sans-serif;">Your id is: ${ id }!`);
}

export default handler;