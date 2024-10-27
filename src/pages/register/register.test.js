import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './index';
import { useAuthContext } from '../../context/AuthContext';
import { register } from './api/register';


jest.mock('./api/register'); // Mock the register function
jest.mock('../../context/AuthContext'); // Mock the useAuthContext hook

describe('RegisterPage', () => {
    const setUserMock = jest.fn();

    beforeEach(() => {
        useAuthContext.mockReturnValue({ setUser: setUserMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the registration form', () => {
        const { getByLabelText, getByText } = render(<RegisterPage />);

        expect(getByLabelText('Username:')).toBeInTheDocument();
        expect(getByLabelText('Password:')).toBeInTheDocument();
        expect(getByLabelText('First name:')).toBeInTheDocument();
        expect(getByLabelText('Last name:')).toBeInTheDocument();
        expect(getByLabelText('Email:')).toBeInTheDocument();
        expect(getByLabelText('Phone:')).toBeInTheDocument();
        expect(getByLabelText('Role:')).toBeInTheDocument();
        expect(getByText('OK')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
    });

    it('should update user state when input values change', () => {
        const { getByLabelText } = render(<RegisterPage />);
        const usernameInput = getByLabelText('Username:');
        const passwordInput = getByLabelText('Password:');
        const firstnameInput = getByLabelText('First name:');
        const lastnameInput = getByLabelText('Last name:');
        const emailInput = getByLabelText('Email:');
        const phoneInput = getByLabelText('Phone:');
        const roleSelect = getByLabelText('Role:');

        fireEvent.change(usernameInput, { target: { value: 'john' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(firstnameInput, { target: { value: 'John' } });
        fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        fireEvent.change(roleSelect, { target: { value: '1' } });

        expect(usernameInput.value).toBe('john');
        expect(passwordInput.value).toBe('password');
        expect(firstnameInput.value).toBe('John');
        expect(lastnameInput.value).toBe('Doe');
        expect(emailInput.value).toBe('john.doe@example.com');
        expect(phoneInput.value).toBe('1234567890');
        expect(roleSelect.value).toBe('1');
    });

    it('should call register function and set user when the form is submitted', async () => {
        const { getByText, getByLabelText } = render(<RegisterPage />);
        const registerButton = getByText('OK');
        const usernameInput = getByLabelText('Username:');
        const passwordInput = getByLabelText('Password:');
        const firstnameInput = getByLabelText('First name:');
        const lastnameInput = getByLabelText('Last name:');
        const emailInput = getByLabelText('Email:');
        const phoneInput = getByLabelText('Phone:');
        const roleSelect = getByLabelText('Role:');

        const user = {
            username: 'john',
            password: 'password',
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            phone_number: '1234567890',
            isAdmin: '1',
        };

        register.mockResolvedValue(user);

        fireEvent.change(usernameInput, { target: { value: user.username } });
        fireEvent.change(passwordInput, { target: { value: user.password } });
        fireEvent.change(firstnameInput, { target: { value: user.firstname } });
        fireEvent.change(lastnameInput, { target: { value: user.lastname } });
        fireEvent.change(emailInput, { target: { value: user.email } });
        fireEvent.change(phoneInput, { target: { value: user.phone_number } });
        fireEvent.change(roleSelect, { target: { value: user.isAdmin } });

        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(register).toHaveBeenCalledTimes(1);
            expect(register).toHaveBeenCalledWith(user);
            expect(setUserMock).toHaveBeenCalledTimes(1);
            expect(setUserMock).toHaveBeenCalledWith(user);
        });
    });
});
