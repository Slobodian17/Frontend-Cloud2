import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCalendar from './index';
import { createCategory } from './api/createCategory';

jest.mock('./api/createCategory');

describe('CreateCalendar', () => {
    it('should submit form and call createCategory API', async () => {
        const mockResponse = { success: true };
        createCategory.mockResolvedValueOnce(mockResponse);

        // Mock console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        render(<CreateCalendar />);

        const titleInput = screen.getByLabelText('Title');
        const submitButton = screen.getByRole('button', { name: 'OK' });

        fireEvent.change(titleInput, { target: { value: 'Walk' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(createCategory).toHaveBeenCalledTimes(1);
            expect(createCategory).toHaveBeenCalledWith({ title: 'Walk' });
            expect(consoleLogSpy).toHaveBeenCalledWith(mockResponse);
        });

        // Restore console.log
        consoleLogSpy.mockRestore();
    });
});
