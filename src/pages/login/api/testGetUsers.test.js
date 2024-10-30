import { getUsers } from './getUsers';

describe('getUsers', () => {
    beforeEach(() => {
        global.fetch = jest.fn(); // Assign a new mock implementation to fetch
    });

    afterEach(() => {
        global.fetch.mockReset(); // Reset the fetch mock after each test
    });

    it('should fetch and return users successfully', async () => {
        const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockUsers),
        });

        const result = await getUsers();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/users');

        expect(result).toEqual(mockUsers);
    });

    it('should log an error message when fetch fails', async () => {
        const errorMessage = 'Network error';

        global.fetch.mockRejectedValue(new Error(errorMessage));

        console.log = jest.fn(); // Spy on console.log

        await getUsers();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/users');

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(expect.any(Error)); // Expect an error object

        console.log.mockRestore(); // Restore the original console.log function
    });
});
