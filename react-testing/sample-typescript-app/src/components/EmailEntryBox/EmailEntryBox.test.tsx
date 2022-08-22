import React from 'react';
// snapshot testing
import renderer from 'react-test-renderer';
// DOM testing
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {EmailEntryBox} from './EmailEntryBox';

/** Snapshot tests 
 * Test case structure:
 * 
 * 1. use renderer with props relevant to use-case
 * 2. expect tree to match snapshot
 * 
*/
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

/** Unit tests & event tests 
 *  Test Case structure:
 * 
 *   1. Initial Setup,
 *   2. Actions - user actions / events
 *   3. What is expected
 * 
*/
describe('basic render tests', () => {
    /**
     * Here we test if the element is being rendered 
     * & if the default value is being considered
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
    /**
     * Here we test the callbacks onEmailChange & onError
     * Note that some checks are purely for demonstration
     * i.e. the toHaveBeenCalledWith is inclusive of the check toHaveBeenCalled()
     * We also see the demonstration of fireEvent(element, payload)
     */

    it('invokes onEmailChange', async () => {
        const mockOnEmailChange = jest.fn();
        render(<EmailEntryBox onEmailChange={mockOnEmailChange}/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, {target: {value: 'testEmail@byjus.com'}});

        await(waitFor(() => {
            expect(mockOnEmailChange).toHaveBeenCalled();
            expect(mockOnEmailChange).toHaveBeenCalledWith('testEmail@byjus.com');
        }));
    });      

    /**
     * Note that here we also check if onEmailChange is NOT called
     * in case of error scenarios
     */
    it('invokes onError for invalid emails', async () => {
        const mockOnEmailChange = jest.fn();
        const mockOnError = jest.fn();
        render(<EmailEntryBox onError={mockOnError} onEmailChange={mockOnEmailChange}/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement,  {target: {value: 'testInvalidEmail'}});

        await(waitFor(() => {
            expect(mockOnEmailChange).not.toBeCalled();
            expect(mockOnError).toBeCalled();
            expect(mockOnError).toHaveBeenCalledWith('This email is invalid / incomplete');
        }));
    });      
});

describe('error message tests', () => {
    /**
     * The following test cases demonstrate the use of testid
     * given by data-testid to easy querying.
     * We also use `findBy__` query since the node becomes visible 
     * in an async manner.
     * NOTE: adding an extra property to a node just for test purposes
     * is NOT advised & should be avoided
     */

    it('displays error message for invalid emails', async () => {
        render(<EmailEntryBox/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, {target: {value: 'testInvalidEmail'}});

        const errMsgNode = await screen.findByTestId('error-msg');
        expect(errMsgNode).toHaveTextContent('This email is invalid / incomplete');
        expect(errMsgNode).toBeInTheDocument();
    })

    it('does not displays error message if props disabled', async () => {
        render(<EmailEntryBox showErrorToast={false}/>);
      
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, {target: {value: 'testInvalidEmail'}});
        await new Promise((r) => setTimeout(r, 500));

        const errMsgNode = await screen.queryByTestId('error-msg');
        expect(errMsgNode).toBeNull();
    })

})
