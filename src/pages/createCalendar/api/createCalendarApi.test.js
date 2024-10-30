import { createCalendar } from './createCalendar';

describe('createCalendar', () => {
    beforeEach(() => {
        // Mock the fetch function to return a desired response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        );

        // Mock the localStorage object
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => 'dummy-token'),
            },
            writable: true,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a POST request with the correct data', async () => {
        const calendar = {
            type: 'calendar3',
            description: 'calendar3',
            time_zone: '2',
        };

        await createCalendar(calendar);

        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/calendar', {
            method: 'POST',
            body: JSON.stringify(calendar),
            headers: {
                Authorization: 'dummy-token',
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });
    });

    it('should return the expected result', async () => {
        const calendar = {
            type: 'calendar3',
            description: 'calendar3',
            time_zone: '2',
        };

        const result = await createCalendar(calendar);

        expect(result).toEqual({ success: true });
    });

    it('should log an error when an exception occurs', async () => {
        const error = new Error('Test error');
        global.fetch = jest.fn(() => Promise.reject(error));

        console.log = jest.fn(); // Mock console.log

        const calendar = {
            type: 'calendar3',
            description: 'calendar3',
            time_zone: '2',
        };

        await createCalendar(calendar);

        expect(console.log).toHaveBeenCalledWith(error);
    });
});
