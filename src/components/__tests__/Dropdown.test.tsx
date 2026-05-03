import React from 'react';
import { render } from '@testing-library/react-native';
import { IndexPath } from '@ui-kitten/components';
import Dropdown from '../Dropdown';

describe('Dropdown', () => {
    const mockData = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
    ];

    it('renders label and placeholder', () => {
        const { getByText } = render(
            <Dropdown
                label="City"
                placeholder="Select a city"
                data={mockData}
                onSelect={() => { }}
            />
        );

        expect(getByText('City')).toBeTruthy();
        expect(getByText('Select a city')).toBeTruthy();
    });

    it('displays selected value', () => {
        const { getByText } = render(
            <Dropdown
                label="City"
                selectedIndex={new IndexPath(0)}
                data={mockData}
                onSelect={() => { }}
            />
        );

        expect(getByText('Option 1')).toBeTruthy();
    });

    it('shows asterisk if required', () => {
        const { getByText } = render(
            <Dropdown
                label="City"
                required={true}
                data={mockData}
                onSelect={() => { }}
            />
        );

        expect(getByText('City *')).toBeTruthy();
    });
});
