import { updateEvent } from './updateEvent';

describe('updateEvent', () => {
    it('should update an event', async () => {
        const eventId = '123';
        const updatedEvent = {
            name: 'Updated Event',
            description: 'Updated description',
        };

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(updatedEvent),
        });

        const result = await updateEvent(updatedEvent, eventId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/event/${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedEvent),
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(updatedEvent);
    });

    it('should handle error during API call', async () => {
        const eventId = '123';
        const updatedEvent = {
            name: 'Updated Event',
            description: 'Updated description',
        };

        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

        const result = await updateEvent(updatedEvent, eventId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/event/${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedEvent),
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
