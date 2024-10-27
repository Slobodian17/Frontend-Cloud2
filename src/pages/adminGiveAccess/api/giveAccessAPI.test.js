import { giveAccess } from './giveAccess'; // Replace 'yourModule' with the actual module name

describe('giveAccess', () => {
    test('should give access to the calendar for a valid user and calendar ID', async () => {
        const userId = 123; // Replace with a valid user ID for your test scenario
        const calendarId = 456; // Replace with a valid calendar ID for your test scenario

        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }), // Replace with the expected response
            })
        );

        // Call the function and assert the expected result
        const result = await giveAccess(userId, calendarId);
        expect(result.success).toBe(true);
    });

    test('should log an error for an invalid user or calendar ID', async () => {
        const userId = 789; // Replace with an invalid user ID for your test scenario
        const calendarId = 101112; // Replace with an invalid calendar ID for your test scenario

        // Mock the fetch function to return an error response
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Request failed')) // Replace with the expected error message
        );

        // Mock the console.log function
        console.log = jest.fn();

        // Call the function
        await giveAccess(userId, calendarId);

        // Assert that the console.log function was called with the expected arguments
        expect(console.log).toHaveBeenCalledWith(new Error('Request failed'));
    });
});
