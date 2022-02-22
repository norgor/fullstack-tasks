export { SubmitContactForm };

function SubmitContactForm(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
            console.log("ContactService Stub: Sent " + JSON.stringify(data));
        }, 1000);
    });
}