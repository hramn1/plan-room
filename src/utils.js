const getRandomInteger = (a, b) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};

const generateRandomIndex = (a, b) => {
    const indexNumbers = [];
    return () => {
        console.log(indexNumbers)
        let currentIndex = getRandomInteger(a, b);
        if (indexNumbers.length === Math.floor(Math.max(a, b))) {
            return '';
        }
        while (indexNumbers.includes(currentIndex)) {
            currentIndex = getRandomInteger(a, b);
        }
        indexNumbers.push(currentIndex);
        return currentIndex;
    };
};
