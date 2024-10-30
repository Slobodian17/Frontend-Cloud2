import { createEvent } from './createEvent';

describe('createEvent', () => {
    beforeEach(() => {
        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: true }),
        });
        // Mock localStorage.getItem
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn().mockReturnValue('your-authorization-token'),
            },
            writable: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should send a POST request to create an event', async () => {
        const event = {
            title: 'eventbsffb',
            description: 'evensbsbbst2',
            created_at: '2022-11-01 12:21:04',
            content: 'evsfbsent',
            category_id: 3,
        };
        const id = 123;

        const response = await createEvent(event, id);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://13.51.196.110:5000/event/${id}`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                Authorization: 'your-authorization-token',
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(response).toEqual({ success: true });
    });

    it('should log an error if the request fails', async () => {
        const event = {
            title: 'eventbsffb',
            description: 'evensbsbbst2',
            created_at: '2022-11-01 12:21:04',
            content: 'evsfbsent',
            category_id: 3,
        };
        const id = 123;

        const error = new Error('Request failed');
        fetch.mockRejectedValueOnce(error);

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        const response = await createEvent(event, id);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://13.51.196.110:5000/event/${id}`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                Authorization: 'your-authorization-token',
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(response).toBeUndefined();
        expect(consoleLogSpy).toHaveBeenCalledWith(error);

        consoleLogSpy.mockRestore();
    });
});
