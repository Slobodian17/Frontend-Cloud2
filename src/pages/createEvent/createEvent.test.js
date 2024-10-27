import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createEvent } from './api/createEvent';
import { getCategories } from '../adminCategories/api/getCategories';
import CreateEvent from './index';

jest.mock('./api/createEvent', () => ({
    createEvent: jest.fn(),
}));

jest.mock('../adminCategories/api/getCategories', () => ({
    getCategories: jest.fn(),
}));

describe('CreateEvent', () => {
    beforeEach(() => {
        // Mock the response from getCategories
        getCategories.mockResolvedValue([
            { id: 1, title: 'Travel' },
            { id: 2, title: 'Job' },
            { id: 3, title: 'Birthday' },
        ]);
    });

    test('should create event on form submission', async () => {
        render(<CreateEvent />);

        const titleInput = screen.getByLabelText('Title');
        const descriptionInput = screen.getByLabelText('Description');
        const contentTextarea = screen.getByLabelText('Content (Optional)');
        const categorySelect = screen.getByRole('combobox');
        const submitButton = screen.getByRole('button', { name: 'OK' });

        fireEvent.change(titleInput, { target: { value: 'Test Event' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });
        fireEvent.change(categorySelect, { target: { value: 1 } });
        fireEvent.click(submitButton);

        expect(createEvent).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Test Event',
                description: 'Test Description',
                content: 'Test Content',
                category_id: 0,
                created_at: expect.stringMatching(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/), // Updated expectation
            }),
            undefined
        );


    });
});
