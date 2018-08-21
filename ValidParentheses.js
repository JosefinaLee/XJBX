/**
 * @param {string} str
 * @return {boolean}
 */

const PARENTHESIS_MAP = {
    ')': '(',
    ']': '[',
    '}': '{'
}

function isValid(str) {
    let stack = [];
    for (let e of str) {
        switch (e) {
            case ('('): case ('{'): case ('['):
                stack.push(e);
                break;

            case (')'): case ('}'): case (']'):
                if (PARENTHESIS_MAP[e] !== stack.pop()) return false;
                break;

            default:
                break;
        }
    }
    return !stack.length;
}

isValid('[]][');