import { TodoItem } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { USER_PREFIX } from "../../constants/redisPrefixes";
import prisma from '../../lib/prisma';
import { redis } from "../../lib/redis";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const uid = req.cookies['id'];
        // check db for id

        let todoItems: TodoItem[] = [];
        if (uid) {
            todoItems = await prisma.todoItem.findMany({
                where: { authorId: (await redis.get(USER_PREFIX + uid)) || "undef" }
            });
        }
        
        res.send((todoItems || ""));
    } else if (req.method === "POST") {
        
    }
}

export default handler;