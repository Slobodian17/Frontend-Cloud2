import { getAccesses } from './getAccesses';

describe('getAccesses', () => {
    it('should send a GET request to the API with the correct headers', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
            // Mock the response object
            ok: true,
            json: jest.fn().mockResolvedValueOnce({}),
        });

        // Set up the localStorage with a mock token
        const mockToken = 'mockToken';
        localStorage.setItem('Authorization', mockToken);

        // Call the getAccesses function
        await getAccesses();

        // Verify that fetch was called with the correct URL and headers
        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/access', {
            headers: {
                Authorization: mockToken,
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });
    });

    it('should return the parsed JSON response', async () => {
        // Create a mock response object
        const mockResponse = {
            data: [
                { calendar_id: '123', person_id: '456' },
                { calendar_id: '789', person_id: '012' },
            ],
        };

        // Mock the fetch function to return the mock response
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        // Call the getAccesses function
        const result = await getAccesses();

        // Verify that the result matches the mock response
        expect(result).toEqual(mockResponse);
    });


});
