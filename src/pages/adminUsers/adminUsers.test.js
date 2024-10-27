import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getUsers } from './api/getUsers';
import { deleteUser } from './api/deleteUser';
import AdminUsers from './index';

jest.mock('./api/getUsers');
jest.mock('./api/deleteUser');

describe('AdminUsers', () => {
    beforeEach(() => {
        getUsers.mockResolvedValue([
            {
                id: 1,
                username: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                phone_number: '123456789',
                isAdmin: true,
            },
            {
                id: 2,
                username: 'Jane',
                lastname: 'Smith',
                email: 'jane.smith@example.com',
                phone_number: '987654321',
                isAdmin: false,
            },
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders users table', async () => {
        render(
            <MemoryRouter>
                <AdminUsers />
            </MemoryRouter>
        );

        // Wait for the users to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Users')).toBeInTheDocument();
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
        });

        expect(getUsers).toHaveBeenCalledTimes(1);
    });

    test('filters users based on query', async () => {
        render(
            <MemoryRouter>
                <AdminUsers />
            </MemoryRouter>
        );

        // Wait for the users to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Users')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Enter a user id:');
        // Enter '1' in the search input
        searchInput.value = '1';
        searchInput.dispatchEvent(new Event('input'));

        await waitFor(() => {

            expect(screen.getByText('John')).toBeInTheDocument();
        });

        // Clear the search input
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));

        await waitFor(() => {
            expect(screen.getByText('Jane')).toBeInTheDocument();
            expect(screen.getByText('John')).toBeInTheDocument();
        });

        expect(getUsers).toHaveBeenCalledTimes(1);
    });



});
