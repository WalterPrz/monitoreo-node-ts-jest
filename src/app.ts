import { Server } from "./presentation/server";
import { envs } from "./config/plugins/env.plugin";
import 'dotenv/config'
(async () => {
    await main()
})();


function main() {
    Server.start()

}