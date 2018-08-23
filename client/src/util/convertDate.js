export const convertMSToMin = time => {
    const sec = Math.floor(time / 1000) % 60
    const min = Math.floor(time / 1000 / 60);

    const fillZero = num => {
        if(num < 10){
            return `0${num}`;
        }

        return num;
    }

    return `${fillZero(min)}:${fillZero(sec)}`;
};