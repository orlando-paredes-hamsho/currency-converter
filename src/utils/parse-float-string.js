const parseFloatString = (floatString) => {
    if (typeof floatString !== 'string') return '';
    let output = floatString.replace(/[^0-9.]/g,'').split('.')
    return output.shift() + (output.length ? '.' + output.join('') : '');
};

export default parseFloatString;
