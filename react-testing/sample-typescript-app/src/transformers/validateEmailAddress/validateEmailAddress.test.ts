import { validateEmailAddress } from "./validateEmailAddress";

describe("validateEmailAddress", () => {
    it("validates emails with a proper domain name", () => {
        const validity = validateEmailAddress("abc@xyz.com");

        expect(validity).toBe(true);
    })
    
    it("rejects empty strings", () => {
        const validity = validateEmailAddress("");

        expect(validity).toBe(false);
    })    

    it("rejects emails missing a domain name", () => {
        const validity = validateEmailAddress("testEmail");

        expect(validity).toBe(false);
    })
})