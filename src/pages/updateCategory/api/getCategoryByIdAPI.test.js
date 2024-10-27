import { getCategoryById } from './getCategoryById';

describe('getCategoryById', () => {
    it('should fetch category data by ID', async () => {
        const categoryId = '123';
        const categoryData = {
            id: categoryId,
            name: 'Sample Category',
            description: 'Sample description',
        };

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(categoryData),
        });

        const result = await getCategoryById(categoryId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/category/${categoryId}`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(categoryData);
    });

    it('should handle error during API call', async () => {
        const categoryId = '123';

        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

        const result = await getCategoryById(categoryId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/category/${categoryId}`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toBeUndefined();
        // You can add additional assertions to handle the error scenario, such as logging or error handling.
    });
});
