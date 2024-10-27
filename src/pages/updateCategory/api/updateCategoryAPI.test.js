import { updateCategory } from './updateCategory';

describe('updateCategory', () => {
    it('should update a category', async () => {
        const categoryId = '123';
        const updatedCategory = {
            name: 'Updated Category',
            description: 'Updated description',
        };

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(updatedCategory),
        });

        const result = await updateCategory(updatedCategory, categoryId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/category/${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCategory),
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        expect(result).toEqual(updatedCategory);
    });

    it('should handle error during API call', async () => {
        const categoryId = '123';
        const updatedCategory = {
            name: 'Updated Category',
            description: 'Updated description',
        };

        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

        const result = await updateCategory(updatedCategory, categoryId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:5000/category/${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCategory),
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
