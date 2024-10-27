import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateCalendar from './index';
import { createCalendar } from './api/createCalendar.js';

jest.mock('./api/createCalendar.js');

describe('CreateCalendar', () => {
    it('should call createCalendar with the correct data on form submission', async () => {
        const createCalendarMock = createCalendar.mockResolvedValue({ success: true });
        const consoleSpy = jest.spyOn(console, 'log'); // Add this line
        const { getByLabelText, getByText, getByRole } = render(<CreateCalendar />);
        const typeInput = getByLabelText('Type');
        const timeZoneSelect = getByRole('combobox');

        fireEvent.change(typeInput, { target: { value: 'calendar3' } });
        fireEvent.change(timeZoneSelect, { target: { value: '2' } });
        fireEvent.submit(getByText('OK'));

        await waitFor(() => {
            expect(createCalendarMock).toHaveBeenCalledWith({
                type: 'calendar3',
                time_zone: '2',
            });
            expect(consoleSpy).toHaveBeenCalledWith({ success: true }); // Updated line
        });

        consoleSpy.mockRestore(); // Add this line to restore console.log
    });
});
