import { render, fireEvent } from '@testing-library/react-native';
import ModalHeader from '../ModalHeader';

describe('ModalHeader', () => {
    const defaultProps = {
        title: 'Test Title'
    };

    it('renders title correctly', () => {
        const { getByText } = render(<ModalHeader {...defaultProps} />);
        expect(getByText('Test Title')).toBeTruthy();
    });

    it('renders subtitle when provided', () => {
        const { getByText } = render(<ModalHeader {...defaultProps} subTitle="Test Subtitle" />);
        expect(getByText('Test Subtitle')).toBeTruthy();
    });

    it('calls handleClosePress when cancel button is pressed', () => {
        const handleClosePress = jest.fn();
        const { getByText } = render(<ModalHeader {...defaultProps} handleClosePress={handleClosePress} />);

        fireEvent.press(getByText('cancel'));
        expect(handleClosePress).toHaveBeenCalled();
    });

    it('calls handleClearPress when save button is pressed', () => {
        const handleClearPress = jest.fn();
        const { getByText } = render(<ModalHeader {...defaultProps} handleClearPress={handleClearPress} />);

        fireEvent.press(getByText('save'));
        expect(handleClearPress).toHaveBeenCalled();
    });
});
