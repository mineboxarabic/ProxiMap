const isIdValid = (id) => {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(id);
};

export default isIdValid;