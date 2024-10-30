import { getAccesses } from './userCalendarAccess';

describe('getAccesses', () => {
    const mockResponse = [
        { id: '1', name: 'Access 1' },
        { id: '2', name: 'Access 2' },
    ];

    beforeEach(() => {
        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );
        // Clear any previous localStorage values
        localStorage.clear();
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('fetches accesses data', async () => {
        // Set a mock Authorization token in localStorage
        const mockAuthorization = 'Bearer mockToken';
        localStorage.setItem('Authorization', mockAuthorization);

        const result = await getAccesses();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://13.51.196.110:5000/access', {
            headers: {
                Authorization: mockAuthorization,
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(mockResponse);
    });

});
