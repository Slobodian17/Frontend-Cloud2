import { deleteCalendar } from './deleteCalendar';

describe('deleteCalendar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('fakeToken');
    });

    it('sends a DELETE request to the server', async () => {
        const id = '123';
        const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
        global.fetch = fetchMock;

        await deleteCalendar(id);

        expect(fetchMock).toHaveBeenCalledWith(`http://13.51.196.110:5000/calendar/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'fakeToken',
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });
    });
    it('should log the error if an exception occurs', async () => {
        // Mock the console.log method
        console.log = jest.fn();

        // Mock the fetch function to throw an error
        global.fetch = jest.fn(() => {
            throw new Error('Mocked error');
        });

        // Call the function
        await deleteCalendar('calendarId');

        // Check that the error was logged
        expect(console.log).toHaveBeenCalledWith(new Error('Mocked error'));
    });
});
