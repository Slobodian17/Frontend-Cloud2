import { getEvents } from './getEvents';

describe('getEvents', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ events: [] }),
        });
    });

    afterEach(() => {
        global.fetch.mockRestore();
    });

    it('fetches events with correct headers', async () => {
        await getEvents();

        expect(global.fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/events', {
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });
    });

    it('returns the parsed JSON response', async () => {
        const events = await getEvents();

        expect(events).toEqual({ events: [] });
    });
});
