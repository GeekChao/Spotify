export const truncateName = (name, len) => {
    if(name.length < len){
        return name;
    }

    return name.substr(0, len - 3).concat('...');
}

export const truncateDate = date => date.substr(0, 10);