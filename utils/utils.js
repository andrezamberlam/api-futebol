const jsEnumToGraphQlEnum = (obj) => {
    let enums = {};
    Object.entries(obj).forEach(([key, value]) => {
        enums[key] = { value: value };
    });
    return enums;
}

const retornaErros = (obj) => {
    let enums = {};
    Object.entries(obj).forEach(([key, value]) => {
        enums[key] = { value: value };
    });
    return enums;
}


module.exports = {
    jsEnumToGraphQlEnum
};