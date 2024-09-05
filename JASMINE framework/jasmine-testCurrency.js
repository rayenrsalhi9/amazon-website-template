import { dollarFormat } from "../quickActions/dollarFormat.js";

describe(' testing suite 1 : dollarFormat test ', () => {

    it('tests a basic value', () => {
        expect(dollarFormat(2095)).toEqual(20.95)
    });

    it('tests a value 0', () => {
        expect(dollarFormat(0)).toEqual(0.00);
    });

    it ('tests an edge value 5 cents', () => {
        expect(dollarFormat(5)).toEqual(0.05);
    });

    it('test an edge value 2000.5 cents', () => {
        expect(dollarFormat(2000.5)).toEqual(20.01);
    });

    it('test an edge value 2000.4 cents', () => {
        expect(dollarFormat(2000.4)).toEqual(20);
    });

    it('test an edge value 2000.9 cents', () => {
        expect(dollarFormat(2000.9)).toEqual(20.01);
    });


});