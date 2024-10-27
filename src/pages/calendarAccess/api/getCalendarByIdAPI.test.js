import { getCalendarById } from './getCalendarById';

describe('getCalendarById', () => {
    const mockId = '1';
    const mockResponse = { id: '1', title: 'Mock Calendar' };

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

    test('fetches calendar data by ID', async () => {
        // Set a mock Authorization token in localStorage
        const mockAuthorization = 'Bearer mockToken';
        localStorage.setItem('Authorization', mockAuthorization);

        const result = await getCalendarById(mockId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/calendar/${mockId}`, {
            headers: {
                Authorization: mockAuthorization,
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(mockResponse);
    });

});
