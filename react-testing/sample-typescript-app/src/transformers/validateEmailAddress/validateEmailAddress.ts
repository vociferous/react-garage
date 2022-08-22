const emailValidator = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

export const validateEmailAddress = (emailId: string):boolean => {
 if(!emailId) return false;

 return emailValidator.test(emailId);
}