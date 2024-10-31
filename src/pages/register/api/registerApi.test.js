import {register} from "./register";

describe('register', () => {
    let mockFetch;

    beforeEach(() => {
        mockFetch = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        mockFetch.mockRestore();
    });

    it('should send a POST request to the correct URL with the user data', async () => {
        const user = { name: 'John Doe', email: 'johndoe@example.com', password: 'password' };
        const expectedUrl = 'http://13.51.196.110:5000/user/register';
        const expectedOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
            },
        };

        await register(user);

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('should return the response data as JSON', async () => {
        const user = { name: 'John Doe', email: 'johndoe@example.com', password: 'password' };
        const mockResponse = { success: true, message: 'User registered successfully' };
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        mockFetch.mockReturnValue(mockFetchPromise);

        const result = await register(user);

        expect(result).toEqual(mockResponse);
    });
});
