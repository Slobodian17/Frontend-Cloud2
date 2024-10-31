import { getEventById } from './getEventById';

describe('getEventById', () => {
    it('should fetch event data by ID', async () => {
        const eventId = '123';
        const eventData = {
            id: eventId,
            name: 'Sample Event',
            description: 'Sample description',
        };

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(eventData),
        });

        const result = await getEventById(eventId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://13.51.196.110:5000/event/${eventId}`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(eventData);
    });

    it('should handle error during API call', async () => {
        const eventId = '123';

        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

        const result = await getEventById(eventId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/event/${eventId}`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toBeUndefined();
        // You can add additional assertions to handle the error scenario, such as logging or error handling.
    });
});
