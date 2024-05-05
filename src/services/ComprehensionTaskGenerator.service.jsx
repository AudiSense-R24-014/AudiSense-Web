import * as URL from './const/url';

const generate = async (feedback, length, questionCount) => {
    const response = await fetch(URL.COMPREHENSIVE_DOC_GEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({feedback, length, questionCount}),
    });
    const data = await response.json();
    return data;
};

export default {
    generate,
};