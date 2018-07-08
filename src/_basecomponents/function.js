import validator from "validator";
import numeral from 'numeral';
import _ from 'lodash'
import t from './language';

export function arrowUpDown(key, dataIndex, data) {
    let x = null;

    if (key === 'ArrowUp') {
        if (dataIndex === null) {
            x = null
        } else if (dataIndex === 0) {
            x = 0
        } else {
            x = dataIndex - 1
        }
    } else if (key === 'ArrowDown') {
        if (dataIndex === null) {
            x = 0
        } else if (dataIndex !== data.length - 1 || dataIndex === 0) {
            x = dataIndex + 1
        } else if (dataIndex === data.length - 1) {
            x = data.length - 1
        }
    }

    return x
}

export function validateFunc(validateArr, val, msg, lang) {

    let errors = [];
    if (_.isBoolean(validateArr)) {
        validateArr = ['required']
    }

    if (!msg && validateArr && validateArr.length) {
        validateArr.forEach(item => {
            switch (item) {
                case 'required':
                    if (validator.isEmpty(val)) {
                        errors.push(t[lang].required) // Bu alan gereklidir
                    }
                    break;
                case 'email':
                    if (!validator.isEmail(val)) {
                        errors.push('Bir E-Posta adresi olmalıdır')
                    }
                    break;
                case 'alpha':
                    if (!validator.isAlpha(val)) {
                        errors.push('Sadece harf girilebilir')
                    }
                    break;
                case 'alphanumeric':
                    if (!validator.isAlphanumeric(val)) {
                        errors.push('Rakam ve harf içermelidir')
                    }
                    break;
                case 'numeric':
                    if (!validator.isNumeric(val)) {
                        errors.push('Sadece rakam girilebilir')
                    }
                    break;
                case 'number':
                    if (!validator.isNumeric(val)) {
                        errors.push('Sadece rakam girilebilir')
                    }
                    break;
                case 'creditcard':
                    if (!validator.isCreditCard(val)) {
                        errors.push('Bir kredi kartı numarası olmalıdır')
                    }
                    break;
                case 'url':
                    if (!validator.isURL(val, ['http', 'https', 'ftp'])) {
                        errors.push('Bir URL adres olmalıdır')
                    }
                    break;
                default:
                    errors = []
            }
        });
    } else {
        errors.push(msg)
    }

    return errors
}

export function formatNumber(val, type) {
    let number = numeral(val);
    number.format();
    numeral.defaultFormat(type);
    // numeral.locale('tr');

    return number.format();
}

export function nullToString(value) {
    let newValue = value;

    if (value === null || typeof value === "undefined" || typeof value === 'object' || typeof value === 'boolean') {
        newValue = '';
    } else {
        newValue = String(newValue)
    }

    return newValue
}

export function keyPressStringSTop(e) {
    const keycode = e.keyCode,
        ctrlKey = e.ctrlKey;

    if ((keycode === 65 && ctrlKey) || (keycode === 67 && ctrlKey) || (keycode === 86 && ctrlKey) || (keycode === 88 && ctrlKey))
        return;
    else if ((keycode > 64 && keycode < 91) || (keycode > 185 && keycode < 188) || (keycode === 189 && keycode === 191 && keycode === 192) || (keycode > 218 && keycode < 223))
        e.preventDefault();
    return e.key;
}

export function inputSetString(state, val) {
    let {dataIndex, selectData, dataShowFields, dataInputSetFields} = state,
        showStr = '',
        selectStr,
        setStr;

    if (val && !_.isEmpty(val)) {
        _.split(dataShowFields, ',').forEach(obj => {
            selectStr = val ? val[_.trim(obj)] : selectData[dataIndex][_.trim(obj)];
            showStr = showStr + ' ' + selectStr
        });

        if (dataInputSetFields && !_.isEmpty(dataInputSetFields)) {
            showStr = '';
            _.split(dataInputSetFields, ',').forEach(k => {
                setStr = val ? val[_.trim(k)] : selectData[dataIndex][_.trim(k)];
                showStr = showStr + ' ' + setStr
            });
        }
    }

    return _.trim(showStr)
}


export function numberValue(state, val) {
    const {useThousandSeparator, precision, useNegative, type} = state;

    if (type === 'number') {

        if (!useNegative) {
            val = Math.abs(val)
        }

        if (useThousandSeparator && !precision) {
            val = formatNumber(val, '0,0')
        }

        if (useThousandSeparator && precision) {
            val = formatNumber(val, '0,0.' + _.repeat('0', precision))
        }

        if (!useThousandSeparator && precision) {
            val = formatNumber(val, '0.' + _.repeat('0', precision))
        }
    }

    return String(val);
}

