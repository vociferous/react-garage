import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import { validateEmailAddress } from '../../transformers';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: centre;
    width: 250px;
`;

const InputBox = styled.input`
    margin: 8px 8px;
`
const ErrorLabel = styled.span`
    font-size: 12px;
    color: red;
`

const errorString = 'This email is invalid / incomplete';

type EmailEntryBoxProps = {
    initEmail?: string;
    showErrorToast?: boolean;
    onEmailChange?: (email:string) => void;
    onError?: (message: string) => void;
}

export const EmailEntryBox:FC<EmailEntryBoxProps> = ({
    initEmail = '',
    showErrorToast = true,
    onEmailChange,
    onError
}) => {

    const [email, setEmail] = useState<string>(initEmail);
    const [error, setError] = useState<string>('');

    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newVal = event.currentTarget.value;
        setEmail(newVal);

        // if(!newVal || validateEmailAddress(newVal)){ setError('') }
        // else{ setError(errorString)}

        if(!newVal || validateEmailAddress(newVal)){
            setError('');
            onEmailChange?.(newVal);
        }else{
            setError(errorString);
            onError?.(errorString);
        }
    }

    // useEffect(()=>{
    //     if(error) onError?.(error)
    //     else onEmailChange?.(email)
    // }, [email])

    return (<Container>
        <InputBox type="email" aria-label="emailId" value={email} onChange={handleOnChange} />
        {showErrorToast && !!error && (<ErrorLabel data-testid="error-msg">{error}</ErrorLabel>)}
        </Container>);
}