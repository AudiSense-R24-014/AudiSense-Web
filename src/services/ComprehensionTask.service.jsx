import * as URL from './const/url';

const generate = async (feedback, length, questionCount, age) => {
    const response = await fetch(URL.COMPREHENSIVE_DOC_GEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({feedback, length, questionCount, age}),
    });
    const data = await response.json();
    return data;
};

const persist = async (generatedComprehension) => {
    const response = await fetch(URL.COMPREHENSIVE_TASK_PERSIST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedComprehension),
    });
    const data = await response.json();
    return data;
};

const persistFeedback = async (feedback) => {
    const response = await fetch(URL.COMPREHENSIVE_FEEDBACK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
    });
    const data = await response.json();
    return data;
};

export default {
    generate,
    persist,
    persistFeedback
};