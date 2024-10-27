import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UpdateEvent from './index';
import { getEventById } from './api/getEventById';
import { updateEvent } from './api/updateEvent';

// Mock getEventById function
jest.mock('./api/getEventById', () => ({
    getEventById: jest.fn(),
}));

// Mock updateEvent function
jest.mock('./api/updateEvent', () => ({
    updateEvent: jest.fn(),
}));

describe('UpdateEvent', () => {
    const mockEvent = {
        id: '1',
        title: 'Mock Event',
        description: 'Mock Event Description',
        content: 'Mock Event Content',
    };

    beforeEach(() => {
        // Clear mock function calls before each test
        jest.clearAllMocks();
    });

    test('handles form submission', async () => {
        // Mock getEventById response
        getEventById.mockResolvedValueOnce(mockEvent);

        // Mock updateEvent response
        updateEvent.mockResolvedValueOnce({ success: true });

        const { getByLabelText, getByText } = render(
            <MemoryRouter initialEntries={['/event/1']}>
                <Routes>
                    <Route path="/event/:id" element={<UpdateEvent />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for getEventById to resolve and populate the form
        await waitFor(() => expect(getEventById).toHaveBeenCalledTimes(1));

        const titleInput = getByLabelText('Title');
        const submitButton = getByText('OK');

        // Modify form input
        fireEvent.change(titleInput, { target: { value: 'Updated Event' } });

        // Submit the form
        act(() => {
            fireEvent.click(submitButton);
        });

        // Wait for updateEvent to be called and handle the submission
        await waitFor(() => expect(updateEvent).toHaveBeenCalledTimes(1));

        // Assertions
        expect(updateEvent).toHaveBeenCalledWith(
            {
                title: 'Updated Event',
                description: mockEvent.description,
                content: mockEvent.content,
                updated_at: expect.any(String),
            },
            mockEvent.id
        );

        // Add more assertions based on the expected behavior of your application
    });
});
