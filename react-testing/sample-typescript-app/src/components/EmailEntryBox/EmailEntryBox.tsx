import React, {FC, useEffect, useState} from 'react';

const emailValidator = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

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

        if(emailValidator.test(newVal)){ setError('') }
        else{ setError('This email is invalid / incomplete')}
    }

    useEffect(()=>{
        if(error) onError?.(error)
        else onEmailChange?.(email)
    }, [email])

    return (<div>
        <input type="email" aria-label="emailId" value={email} onChange={handleOnChange} />
        {showErrorToast && !!error && (<i aria-label='error-msg'>{error}</i>)}
        </div>);
}