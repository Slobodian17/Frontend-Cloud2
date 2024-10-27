import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { getCalendarById } from './api/getCalendarById.js';
import { updateCalendar } from './api/updateCalendar.js';
import UpdateCalendar from './index';

jest.mock('./api/getCalendarById.js');
jest.mock('./api/updateCalendar.js');

describe('UpdateCalendar', () => {
    const mockedGetCalendarById = getCalendarById;
    const mockedUpdateCalendar = updateCalendar;

    beforeEach(() => {
        mockedGetCalendarById.mockClear();
        mockedUpdateCalendar.mockClear();
    });

    test('updates calendar on form submission', async () => {
        const calendarId = '123';
        const calendarData = {
            type: 'event',
            description: 'Sample description',
            time_zone: '1',
        };
        mockedGetCalendarById.mockResolvedValue(calendarData);
        mockedUpdateCalendar.mockResolvedValue({ success: true });

        render(
            <MemoryRouter initialEntries={[`/calendar/${calendarId}`]}>
                <Routes>
                    <Route path="/calendar/:id" element={<UpdateCalendar />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for the API call to resolve and update the component state
        await screen.findByLabelText(/Type/i);

        const typeInput = screen.getByLabelText(/Type/i);
        const descriptionTextarea = screen.getByLabelText(/Description/i);
        const submitButton = screen.getByText(/OK/i);

        fireEvent.change(typeInput, { target: { value: 'updated event' } });
        fireEvent.change(descriptionTextarea, { target: { value: 'Updated description' } });

        fireEvent.click(submitButton);

        expect(mockedUpdateCalendar).toHaveBeenCalledTimes(1);
        expect(mockedUpdateCalendar).toHaveBeenCalledWith(
            {
                type: 'updated event',
                description: 'Updated description',
                time_zone: calendarData.time_zone,
            },
            calendarId
        );

        // Assert any further expectations after the update is complete
    });
});
