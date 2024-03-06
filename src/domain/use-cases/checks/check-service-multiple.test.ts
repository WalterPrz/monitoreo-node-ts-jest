import { LogEntity } from "../../entities/log.entity"
import { CheckServiceMultiple } from "./check-service-multiple"

describe('CheckserviceMultiple use case', () => {
    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallBack = jest.fn()
    const errorCallBack = jest.fn()
    const checkService = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
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

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
    test('should call errorCallback when fetch return false', async () => {
        const wasOk = await checkService.execute('https://www.godedededededogle.com')
        expect(wasOk).toBe(false)
        expect(successCallBack).not.toHaveBeenCalled()
        expect(errorCallBack).toHaveBeenCalled()

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})