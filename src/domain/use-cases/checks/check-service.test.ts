import { LogEntity } from "../../entities/log.entity"
import { CheckService } from "./check-service"

describe('Checkservice use case', () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallBack = jest.fn()
    const errorCallBack = jest.fn()
    const checkService = new CheckService(
        mockRepository,
        successCallBack,
        errorCallBack
    );
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should call successCallBack when fetch return true', async () => {
        const wasOk = await checkService.execute('https://www.google.com')
        expect(wasOk).toBe(true)
        expect(successCallBack).toHaveBeenCalled()
        expect(errorCallBack).not.toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
    test('should call errorCallback when fetch return false', async () => {
        const wasOk = await checkService.execute('https://www.godedededededogle.com')
        expect(wasOk).toBe(false)
        expect(successCallBack).not.toHaveBeenCalled()
        expect(errorCallBack).toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})