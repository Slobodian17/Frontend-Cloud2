import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './index';
import { login } from './api/login';
import { useNavigate } from 'react-router-dom';

jest.mock('./api/login'); // Mock the login function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('LoginPage', () => {
    const navigateMock = jest.fn();
    let localStorageMock = {};

    beforeEach(() => {
        useNavigate.mockReturnValue(navigateMock);
        localStorageMock = {};

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn((key) => localStorageMock[key]),
                setItem: jest.fn((key, value) => {
                    localStorageMock[key] = value;
                }),
                removeItem: jest.fn((key) => {
                    delete localStorageMock[key];
                }),
            },
            writable: true,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the login form', () => {
        const { getByLabelText, getByText } = render(<LoginPage />);

        expect(getByLabelText('Username:')).toBeInTheDocument();
        expect(getByLabelText('Password:')).toBeInTheDocument();
        expect(getByText('OK')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
    });

    it('should update user state when input values change', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('Username:');
        const passwordInput = getByLabelText('Password:');

        fireEvent.change(usernameInput, { target: { value: 'john' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(usernameInput.value).toBe('john');
        expect(passwordInput.value).toBe('password');
    });

    it('should call login function, set local storage, and navigate to the appropriate page when the form is submitted and login is successful', async () => {
        const { getByText, getByLabelText } = render(<LoginPage />);
        const loginButton = getByText('OK');
        const usernameInput = getByLabelText('Username:');
        const passwordInput = getByLabelText('Password:');

        const user = {
            username: 'john',
            password: 'password',
            isAdmin: '1',
        };

        login.mockResolvedValue(user);

        fireEvent.change(usernameInput, { target: { value: user.username } });
        fireEvent.change(passwordInput, { target: { value: user.password } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(login).toHaveBeenCalledTimes(1);
            expect(login).toHaveBeenCalledWith(`Basic ${btoa(`${user.username}:${user.password}`)}`);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('Authorization', `Basic ${btoa(`${user.username}:${user.password}`)}`);
            expect(navigateMock).toHaveBeenCalledTimes(1);
            expect(navigateMock).toHaveBeenCalledWith('/admin');
        });
    });

    it('should call login function, show an alert, and not navigate when the form is submitted and login fails', async () => {
        const { getByText, getByLabelText } = render(<LoginPage />);
        const loginButton = getByText('OK');
        const usernameInput = getByLabelText('Username:');
        const passwordInput = getByLabelText('Password:');

        const errorMessage = 'Invalid login/password';

        login.mockRejectedValue(new Error(errorMessage));

        fireEvent.change(usernameInput, { target: { value: 'john' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        jest.spyOn(window, 'alert').mockImplementation(() => {}); // Spy on window.alert

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(login).toHaveBeenCalledTimes(1);
            expect(login).toHaveBeenCalledWith('Basic am9objpwYXNzd29yZA==');
            expect(localStorage.setItem).not.toHaveBeenCalled();
            expect(navigateMock).not.toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith(errorMessage);
        });

        window.alert.mockRestore(); // Restore the original window.alert function
    });

});
