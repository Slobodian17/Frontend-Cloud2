// Import necessary dependencies and functions
import { getUserById, updateUser } from './editUser';

describe('getUserById', () => {
    test('should return user data for a valid ID', async () => {
        const userId = 123; // Replace with a valid user ID for your test scenario

        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ id: userId, name: 'John Doe' }), // Replace with sample user data
            })
        );

        // Call the function and assert the expected result
        const user = await getUserById(userId);
        expect(user.id).toEqual(userId);
        expect(user.name).toEqual('John Doe');
    });

    test('should throw an error for an invalid ID', async () => {
        const userId = 456; // Replace with an invalid user ID for your test scenario

        // Mock the fetch function to return an error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.reject(new Error('User not found')), // Replace with the expected error message
            })
        );

        // Call the function and assert that it throws an error
        await expect(getUserById(userId)).rejects.toThrow('User not found');
    });
});

describe('updateUser', () => {
    test('should update the user data', async () => {
        const user = { id: 123, name: 'Jane Smith' }; // Replace with the user data you want to update
        const userId = 123; // Replace with the ID of the user you want to update

        // Mock the fetch function
        global.fetch = jest.fn(() => Promise.resolve());

        // Call the function
        await updateUser(user, userId);

        // Assert that the fetch function was called with the expected arguments
        expect(global.fetch).toHaveBeenCalledWith(
            `http://127.0.0.1:5000/user/${userId}`,
            {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
            }
        );
    });
});
