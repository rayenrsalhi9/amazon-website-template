import { dollarFormat } from "../quickActions/dollarFormat.js";

describe('test suite : dollarFormat', () => {

    it('tests with a basic value 2095 cents => 20.95', () => {
        expect(dollarFormat(2095)).toEqual('20.95');
    });

    it('test with a value 0', () => {
        expect(dollarFormat(0)).toEqual('0.00');
    });

    it('tests with an edge value 5 cents => 0.05', () => {
        expect(dollarFormat(5)).toEqual('0.05');
    });

    it('tests with an edge value 2000.4 cents => 20.00', () => {
        expect(dollarFormat(2000.4)).toEqual('20.00');
    });

    it('tests with an edge value 2000.5 cents => 20.01', () => {
        expect(dollarFormat(2000.5)).toEqual('20.01');
    });

    it('tests with an edge value 2000.9 cents => 20.01', () => {
        expect(dollarFormat(2000.9)).toEqual('20.01');
        expect(dollarFormat(2000.90)).toEqual('20.01');
    });

});