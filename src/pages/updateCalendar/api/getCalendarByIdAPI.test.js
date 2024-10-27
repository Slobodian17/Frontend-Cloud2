import { getCalendarById } from './getCalendarById'; // Replace 'yourModule' with the actual module path

describe('getCalendarById', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ /* mock response data */ }),
            })
        );
        global.localStorage = {
            getItem: jest.fn(() => 'mockAuthorizationToken'), // Replace with the actual authorization token you expect
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });



    it('should return the result from the API', async () => {
        const id = 'calendarId';
        const mockResult = { /* mock response data */ };
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResult),
            })
        );

        const result = await getCalendarById(id);

        expect(result).toEqual(mockResult);
    });

    it('should log an error if an exception occurs', async () => {
        const id = 'calendarId';
        const mockError = new Error('Mock error');
        global.fetch.mockImplementationOnce(() => Promise.reject(mockError));
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await getCalendarById(id);

        expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });
});
