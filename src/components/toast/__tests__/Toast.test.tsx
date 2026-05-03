import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Toast } from '../Toast';

describe('Toast', () => {
    const onClose = jest.fn();

    it('renders success message correctly', () => {
        const { getByText } = render(
            <Toast message="Operation Successful" type="success" onClose={onClose} />
        );
        expect(getByText('Operation Successful')).toBeTruthy();
        expect(getByText('CheckCircle2Icon')).toBeTruthy();
    });

    it('renders error message correctly', () => {
        const { getByText } = render(
            <Toast message="An error occurred" type="error" onClose={onClose} />
        );
        expect(getByText('An error occurred')).toBeTruthy();
        expect(getByText('XCircleIcon')).toBeTruthy();
    });

    it('calls onClose when close button is pressed', () => {
        const { getByText } = render(
            <Toast message="Message" type="info" onClose={onClose} />
        );

        // X icon renders as 'XIcon'
        fireEvent.press(getByText('XIcon'));
        expect(onClose).toHaveBeenCalled();
    });
});
