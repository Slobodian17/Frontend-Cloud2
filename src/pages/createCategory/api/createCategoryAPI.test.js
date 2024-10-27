import { createCategory } from './createCategory';

describe('createCategory', () => {
    let fetchMock;
    let consoleLogMock;

    beforeEach(() => {
        fetchMock = jest.spyOn(global, 'fetch');
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        fetchMock.mockRestore();
        consoleLogMock.mockRestore();
    });

    it('should send a POST request with the correct data', async () => {
        const category = { title: 'Walk' };
        const mockResponse = { success: true };
        fetchMock.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await createCategory(category);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:5000/category', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                Authorization: null, // You may need to modify this depending on your implementation
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
        const category = { title: 'Walk' };
        const mockError = new Error('Network error');
        fetchMock.mockRejectedValueOnce(mockError);

        const result = await createCategory(category);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:5000/category', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                Authorization: null, // You may need to modify this depending on your implementation
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(consoleLogMock).toHaveBeenCalledWith(mockError);
        expect(result).toBeUndefined();
    });
});
