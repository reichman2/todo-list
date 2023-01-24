import { NextApiRequest, NextApiResponse } from "next";
import { USER_PREFIX } from "../../constants/redisPrefixes";
import prisma from '../../lib/prisma';
import { redis } from "../../lib/redis";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Get the user's id and check it's validity.
    const uid = req.cookies['id']; 
    if (!uid) return res.status(401).write("401 Unauthorized");
    const body = JSON.parse(req.body);
    let authorId = await redis.get(USER_PREFIX + uid);

    if (!authorId) return res.status(401).write("401 Unauthorized");

    // TODO implement csrf token

    if (req.method === "POST") {
        const post = await prisma.todoItem.create({
            data: {
                text: body.text,
                authorId
            }
        });
        
        console.log(`I got that stinky message!: ${post.text}`);
        // console.log(JSON.stringify(post));

        return res.status(200).json(post);
    } else if (req.method === "DELETE") {
        const postId = JSON.parse(req.body)['postId'] as string;
        console.log(`postId: ${postId}`);

        // TODO check author id so other users cannot delete items that aren't theirs
        
        const post = await prisma.todoItem.delete({
            where: {
                id: postId,
            },
        });

        console.log(`Deleting:`, post);
        return res.status(200).json(post);
    }
}

export default handler;