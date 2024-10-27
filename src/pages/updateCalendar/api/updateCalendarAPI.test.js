import { updateCalendar } from './updateCalendar'; // Replace 'yourModule' with the actual module path

describe('updateCalendar', () => {
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
        const calendar = { /* mock calendar data */ };
        const id = 'calendarId';
        const mockResult = { /* mock response data */ };
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResult),
            })
        );

        const result = await updateCalendar(calendar, id);

        expect(result).toEqual(mockResult);
    });

    it('should log an error if an exception occurs', async () => {
        const calendar = { /* mock calendar data */ };
        const id = 'calendarId';
        const mockError = new Error('Mock error');
        global.fetch.mockImplementationOnce(() => Promise.reject(mockError));
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await updateCalendar(calendar, id);

        expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });
});
