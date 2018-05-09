export function formatPrice (price) {
    if (isNaN(parseFloat(price))) return;
    var num = parseFloat(price).toFixed(2) + '';
    var integer = num.split('.')[0].split('').reverse();
    var decimal = num.split('.')[1];

    var result = '';

    for (let i = 0; i < integer.length; i++) {
        if ((i + 1) % 3 === 0 && (i + 1) !== integer.length) {
            result += integer[i] + ',';
        } else {
            result += integer[i];
        }
    }

    return result.split('').reverse().join('') + '.' + decimal;
}
