import React from 'react';
import { render } from '@testing-library/react-native';
import { Loader } from '../Loader';

describe('Loader', () => {
    it('renders when visible is true', () => {
        const { toJSON } = render(<Loader visible={true} />);
        expect(toJSON()).not.toBeNull();
    });

    it('does not render when visible is false', () => {
        const { toJSON } = render(<Loader visible={false} />);
        expect(toJSON()).toBeNull();
    });
});
