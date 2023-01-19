import { NextApiRequest, NextApiResponse } from "next";
import { USER_PREFIX } from "../../constants/redisPrefixes";
import prisma from '../../lib/prisma';
import { redis } from "../../lib/redis";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const uid = req.cookies['id'];
        
        if (!uid) return res.status(401).write("401 Unauthorized");

        const body = JSON.parse(req.body);
        let authorId = await redis.get(USER_PREFIX + uid);

        if (!authorId) return res.status(401).write("401 Unauthorized");

        const post = await prisma.todoItem.create({
            data: {
                text: body.text,
                authorId
            }
        });
        
        console.log(`I got that stinky message!: ${post.text}`)

        return res.status(200).write(post);
    }
}

export default handler;