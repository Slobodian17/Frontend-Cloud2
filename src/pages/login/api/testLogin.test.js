import { login } from './login';

describe('login', () => {
    beforeEach(() => {
        global.fetch = jest.fn(); // Assign a new mock implementation to fetch
    });

    afterEach(() => {
        global.fetch.mockReset(); // Reset the fetch mock after each test
    });

    it('should send login request with encoded credentials and return the result', async () => {
        const encodedCredentials = 'dXNlcm5hbWU6cGFzc3dvcmQ='; // Example encoded credentials
        const mockResult = { id: 1, username: 'user', isAdmin: '0' };

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResult),
        });

        const result = await login(encodedCredentials);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/user_login', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: encodedCredentials,
            },
        });

        expect(result).toEqual(mockResult);
    });

    it('should handle errors when login request fails', async () => {
        const encodedCredentials = 'dXNlcm5hbWU6cGFzc3dvcmQ='; // Example encoded credentials
        const errorMessage = 'Login failed';

        global.fetch.mockRejectedValue(new Error(errorMessage));

        await expect(login(encodedCredentials)).rejects.toThrow(errorMessage);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/user_login', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: encodedCredentials,
            },
        });
    });
});
