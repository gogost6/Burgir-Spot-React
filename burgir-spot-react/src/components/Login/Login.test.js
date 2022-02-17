import Login from './Login';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '../../test-utils';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loginUser } from '../../services/authService';

jest.mock('../../services/authService');

describe('login component', () => {
    beforeEach(async () => {
        await act(async () => {
            await render(<BrowserRouter>
                <Login />
            </BrowserRouter>);
        })
    })

    test('renders', () => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    });

    test('create account btn CLICK redirects to /register after ',async () => {
        fireEvent.click(screen.getByText('Create account'));
        expect(window.location.pathname).toBe('/register');
    });

    test('submit with empty data', async () => {
        await act(async () => {
            loginUser.mockResolvedValue({
                username: '', password: ''
            })
            await userEvent.click(screen.getByText('Login'));
        })

        expect(screen.getByText('Please write your username!')).toBeInTheDocument();
        expect(screen.getByText('Please write your password!')).toBeInTheDocument();
    });

    // test('submit with wrong data', async () => {
    //     const usernameInput = screen.getByLabelText(/username/i)
    //     const passwordInput = screen.getByLabelText(/password/i)

    //     await act(async () => {
    //         userEvent.type(usernameInput, 'a');
    //         userEvent.type(passwordInput, 'a');
        
    //         loginUser.mockResolvedValue({
    //             username: 'a', password: 'a'
    //         })
    //         await userEvent.click(screen.getByText('Login'));
    //     });
            
    //     expect(screen.queryByText('Please write your username!')).toBeNull();
    //     expect(screen.queryByText('Please write your password!')).toBeNull();
    //     expect(screen.getByText('Wrong username or password!')).toBeInTheDocument();
    // });
})