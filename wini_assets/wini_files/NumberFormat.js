/**
 * Format numbers.
 *
 * Heavily inspired by http://locutus.io/php/strings/number_format/
 *
 */
var NumberFormat = {

    decimals: 2,

    decimalSeparator: ',',

    thousandsSeparator: '.',

    currencySign: '€',

    prependCurrency: false,
    
    /**
     * Format a number
     *
     * @param number
     * @returns {*}
     */
    format: function (number) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number;
        var precision = !isFinite(+NumberFormat.decimals) ? 0 : Math.abs(NumberFormat.decimals);
        var sep = (typeof NumberFormat.thousandsSeparator === 'undefined') ? ',' : NumberFormat.thousandsSeparator;
        var dec = (typeof NumberFormat.decimalSeparator === 'undefined') ? '.' : NumberFormat.decimalSeparator;
        var toFixedFix = function (n, precision) {
            if (('' + n).indexOf('e') === -1) {
                return +(Math.round(n + 'e+' + precision) + 'e-' + precision)
            } else {
                var arr = ('' + n).split('e');
                var sig = '';
                if (+arr[1] + precision > 0) {
                    sig = '+'
                }
                return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + precision)) + 'e-' + precision)).toFixed(precision)
            }
        };
        var s = (precision ? toFixedFix(n, precision).toString() : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
        }
        if ((s[1] || '').length < precision) {
            s[1] = s[1] || '';
            s[1] += new Array(precision - s[1].length + 1).join('0')
        }
        return s.join(dec)
    },

    /**
     * Format currency
     *
     * @param number
     * @returns {*|string}
     */
    currency: function(number) {
        var formatted = '';
        var formattedNumber = NumberFormat.format(number);
        if(NumberFormat.prependCurrency) {
            formatted = NumberFormat.currencySign + ' ' + formattedNumber;
        }
        else {
            formatted = formattedNumber + ' ' + NumberFormat.currencySign;
        }
        return formatted;
    },

    /**
     *
     */
    formattedCurrencyToString: function(number) {
        //number = number.replace(NumberFormat.thousandsSeparator, '');
        //number = number.replace(NumberFormat.decimalSeparator, '.');
        //return parseFloat(number) * 100;
    }

};
