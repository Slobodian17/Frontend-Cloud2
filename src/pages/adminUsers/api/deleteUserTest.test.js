import { deleteUser } from './deleteUser';

describe('deleteUser', () => {
    it('should send a DELETE request to the server with the correct URL and headers', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({});

        const mockLocalStorage = {
            getItem: jest.fn(() => 'mockedToken'),
        };
        Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

        const id = 123;

        // Call the deleteUser function
        await deleteUser(id);

        // Expect the fetch function to be called with the correct arguments
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/user/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'mockedToken',
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        // Expect localStorage.getItem to be called with the correct argument
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('Authorization');
    });

    it('should log an error if the request fails', async () => {
        const mockError = new Error('Mocked error');
        global.fetch = jest.fn().mockRejectedValueOnce(mockError);

        const consoleLogSpy = jest.spyOn(console, 'log');

        const id = 123;

        await deleteUser(id);

        expect(consoleLogSpy).toHaveBeenCalledWith(mockError);
    });
});
