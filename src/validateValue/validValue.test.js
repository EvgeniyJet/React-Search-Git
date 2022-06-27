const validValue = require('./validValue');

test('валидация значений', () => {
	expect(validValue(50)).toBe(true)
})