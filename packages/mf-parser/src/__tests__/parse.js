'use strict';


const parse = require('../parse');


var tests = {
    C10: [{kind: 'atom', value: 'C'}, {kind: 'multiplier', value: 10}],
    'C-1': [{kind: 'atom', value: 'C'}, {kind: 'multiplier', value: -1}],
    'C1-10': [{kind: 'atom', value: 'C'}, {kind: 'multiplierRange', value: {from: 1, to: 10}}],
    '2H': [{kind: 'preMultiplier', value: 2}, {kind: 'atom', value: 'H'}],
    '[13C]': [{kind: 'isotope', value: {atom: 'C', isotope: 13}}],
    'C++': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: 2}],
    'C2+': [{kind: 'atom', value: 'C'}, {kind: 'multiplier', value: 2}, {kind: 'charge', value: 1}],
    'C(2+)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: 2}],
    'C(++)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: 2}],
    'C(+2)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: 2}],
    'C(2-)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: -2}],
    'C(--)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: -2}],
    '(H+)': [{kind: 'openingParenthesis', value: '('}, {kind: 'atom', value: 'H'}, {kind: 'charge', value: 1}, {kind: 'closingParenthesis', value: ')'}],
    C$ABC: [{kind: 'atom', value: 'C'}, {kind: 'comment', value: 'ABC'}],
    'C(-1)(-3)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: -1}, {kind: 'charge', value: -3}],
    'C(-1)2(-3)3': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: -1}, {kind: 'multiplier', value: 2}, {kind: 'charge', value: -3}, {kind: 'multiplier', value: 3}],
    'C(-2)': [{kind: 'atom', value: 'C'}, {kind: 'charge', value: -2}],
    'C(H-2)': [{kind: 'atom', value: 'C'}, {kind: 'openingParenthesis', value: '('}, {kind: 'atom', value: 'H'}, {kind: 'multiplier', value: -2}, {kind: 'closingParenthesis', value: ')'}],
    'H.Cl': [{kind: 'atom', value: 'H'}, {kind: 'salt', value: '.'}, {kind: 'atom', value: 'Cl'}],
    'H{1,1}': [{kind: 'isotopeRatio', value: {atom: 'H', ratio: [1, 1]}}],
    'C10 . H20': [{kind: 'atom', value: 'C'}, {kind: 'multiplier', value: 10}, {kind: 'text', value: ' '}, {kind: 'salt', value: '.'}, {kind: 'text', value: ' '}, {kind: 'atom', value: 'H'}, {kind: 'multiplier', value: 20}],
    '(CH(CH3)2)3N.2HCl': [{kind: 'openingParenthesis', value: '('}, {kind: 'atom', value: 'C'}, {kind: 'atom', value: 'H'}, {kind: 'openingParenthesis', value: '('}, {kind: 'atom', value: 'C'}, {kind: 'atom', value: 'H'}, {kind: 'multiplier', value: 3}, {kind: 'closingParenthesis', value: ')'}, {kind: 'multiplier', value: 2}, {kind: 'closingParenthesis', value: ')'}, {kind: 'multiplier', value: 3}, {kind: 'atom', value: 'N'}, {kind: 'salt', value: '.'}, {kind: 'preMultiplier', value: 2}, {kind: 'atom', value: 'H'}, {kind: 'atom', value: 'Cl'}],
};

test('parse molecular formula', function () {
    for (var key of Object.keys(tests)) {
        check(key, tests[key]);
    }
});

test('not same opening and closing parenthesis', function () {
    expect(() => {
        parse('C(');
    }).toThrowError(/.*opening and closing.*/);
});


function check(mf, result) {
    var parsed = parse(mf);
    expect(parsed).toMatchObject(result);
}