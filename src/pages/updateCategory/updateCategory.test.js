import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UpdateCategory from './index';
import { getCategoryById } from './api/getCategoryById';
import { updateCategory } from './api/updateCategory';

// Mock getCategoryById function
jest.mock('./api/getCategoryById', () => ({
    getCategoryById: jest.fn(),
}));

// Mock updateCategory function
jest.mock('./api/updateCategory', () => ({
    updateCategory: jest.fn(),
}));

describe('UpdateCategory', () => {
    const mockCategory = {
        id: '1',
        title: 'Mock Category',
    };

    beforeEach(() => {
        // Clear mock function calls before each test
        jest.clearAllMocks();
    });



    test('handles form submission', async () => {
        // Mock getCategoryById response
        getCategoryById.mockResolvedValueOnce(mockCategory);

        // Mock updateCategory response
        updateCategory.mockResolvedValueOnce({ success: true });

        const { getByLabelText, getByText } = render(
            <MemoryRouter initialEntries={['/category/1']}>
                <Routes>
                    <Route path="/category/:id" element={<UpdateCategory />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for getCategoryById to resolve and populate the form
        await waitFor(() => expect(getCategoryById).toHaveBeenCalledTimes(1));

        const titleInput = getByLabelText('Title');
        const submitButton = getByText('OK');

        // Modify form input
        fireEvent.change(titleInput, { target: { value: 'Updated Category' } });

        // Submit the form
        act(() => {
            fireEvent.click(submitButton);
        });

        // Wait for updateCategory to be called and handle the submission
        await waitFor(() => expect(updateCategory).toHaveBeenCalledTimes(1));

        // Assertions
        expect(updateCategory).toHaveBeenCalledWith(
            { title: 'Updated Category' },
            mockCategory.id
        );

        // Add more assertions based on the expected behavior of your application
    });
});
