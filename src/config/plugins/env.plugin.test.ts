import { envs } from "./env.plugin"

describe('envs.plugin.ts', ()=>{
    test('should return env options', ()=>{
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'correonodets@gmail.com',
            MAILER_SECRET_KEY: 'gcpwcklwocekjkkb',
            PROD: false,
            MONGO_URL: 'mongodb://mongo-user:123456@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'root',
            MONGO_PASS: '123456'
        })
    })

    test('should return error if not found env',async ()=>{
        jest.resetModules();
        process.env.PORT = 'ABC'
        try{
            await import('./env.plugin')
            expect(true).toBe(false)
        }catch(e){
            expect(`${e}`).toContain(`"PORT" should be a valid integer`)
        }
    })
})