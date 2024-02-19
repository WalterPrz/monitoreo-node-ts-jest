import { Server } from "./presentation/server";
import { envs } from "./config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";
(async () => {
    await main()
})();


async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'

    //     }
    // })

    // const logs =  await prisma.logModel.findMany({
    //     where:{
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs)
    Server.start()

}