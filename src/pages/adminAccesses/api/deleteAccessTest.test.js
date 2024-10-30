import { deleteAccess } from './deleteAccess';

describe('deleteAccess', () => {
    it('should send a DELETE request to the API with the correct parameters', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
            // Mock the response object
            ok: true,
        });

        // Set up the localStorage with a mock token
        const mockToken = 'mockToken';
        localStorage.setItem('Authorization', mockToken);

        // Define the user and calendar IDs
        const userId = '123';
        const calendarId = '456';

        // Call the deleteAccess function
        await deleteAccess(userId, calendarId);

        // Verify that fetch was called with the correct URL, method, and headers
        expect(fetch).toHaveBeenCalledWith(
            `http://13.60.196.234:5000/calendar/get_access/${userId}/${calendarId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: mockToken,
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
            }
        );
    });

    it('should log the error if the request fails', async () => {
        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

        // Spy on the console.log method
        jest.spyOn(console, 'log').mockImplementationOnce(() => {});

        // Call the deleteAccess function
        await deleteAccess('123', '456');

        // Verify that console.log was called with the error message
        expect(console.log).toHaveBeenCalledWith(new Error('Network error'));
    });
});
