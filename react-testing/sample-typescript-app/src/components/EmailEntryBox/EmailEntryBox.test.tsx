import React from 'react';
// snapshot testing
import renderer from 'react-test-renderer';
// DOM testing
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {EmailEntryBox} from './EmailEntryBox';

/** Snapshot tests */
describe('snapshot testing', () => {
    it('matches default snapshot', () => {
        const entryBox = renderer.create(<EmailEntryBox />);
        let tree = entryBox.toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('matches snapshot w/ placeholder', () => {
        const entryBox = renderer.create(<EmailEntryBox initEmail='testEmail@test.com'/>);
        let tree = entryBox.toJSON();
        expect(tree).toMatchSnapshot();
    })
})

/** Unit tests & event tests */
describe('basic render tests', () => {
    /*
    Test Case:
    1. Initial Setup,
    2. Actions - user actions / events
    3. What is expected
    */

    it('renders input box', () => {
        render(<EmailEntryBox />);
      
        const inputElement = screen.getByRole('textbox');
      
        expect(inputElement).toBeInTheDocument();
    });      

    it('renders input box with initial value', () => {
        render(<EmailEntryBox initEmail='testEmail'/>);
      
        const inputElement = screen.getByRole('textbox');
      
        expect(inputElement).toHaveValue('testEmail')
    });      
});
  

describe('invokes props callbacks', () => {

    it('invokes onEmailChange', async () => {
        const mockOnEmailChange = jest.fn();
        render(<EmailEntryBox onEmailChange={mockOnEmailChange}/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, {target: {value: 'testEmail@byjus.com'}});

        await(waitFor(() => {
            expect(mockOnEmailChange).toHaveBeenCalled();
        }));
    });      

    it('invokes onError for invalid emails', async () => {
        const mockOnError = jest.fn();
        render(<EmailEntryBox onError={mockOnError}/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement,  {target: {value: 'testInvalidEmail'}});

        await(waitFor(() => {
            expect(mockOnError).toBeCalled();
        }));
    });      
});

describe('error message tests', () => {
    it('displays error message for invalid emails', async () => {
        render(<EmailEntryBox/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, 'testInvalidEmail');

        setTimeout(() => {
            const errMsgNode = screen.getByLabelText('error-msg');
            expect(errMsgNode).toBeInTheDocument();
        }, 50)
    })

    it('does not displays error message if props disabled', async () => {
        render(<EmailEntryBox showErrorToast={false}/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, 'testInvalidEmail');

        setTimeout(() => {
            const errMsgNode = screen.queryByLabelText('error-msg');
            expect(errMsgNode).toHaveDisplayValue('This email is invalid / incomplete');
            expect(errMsgNode).toBeNull();
        }, 50)
    })

})
