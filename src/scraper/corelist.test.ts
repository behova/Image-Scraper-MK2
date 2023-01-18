import { getCore } from './coreList';
import { getScrollAmount } from './coreList';

test('should return a core scraper function', () => {
    const value = getCore();
    console.log(value);
    expect(value).toBeInstanceOf(Function);
});

test('should return a random number between 5 & 20', () => {
    const value = getScrollAmount();
    console.log(value);
    expect(value).toBeGreaterThanOrEqual(5);
    expect(value).toBeLessThan(20);
});
