import { TestBed, inject } from '@angular/core/testing';
import { WglShaderFunction } from './wgl-shader-function';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { WglShaderFloatType } from '../../expression/types/wgl-shader-float-type';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { WglShaderArgumentListParser } from '../util/wgl-shader-argument-list-parser';

describe(WglShaderFunction.name, () => {

    let signature: WglShaderFunctionSignature;
    let variables: WglShaderVariable[];

    beforeEach(() => {
        signature = new WglShaderFunctionSignature([new WglShaderIntegerType(), new WglShaderIntegerType()], new WglShaderIntegerType());
        variables = [new WglShaderVariable('v0', new WglShaderIntegerType()), new WglShaderVariable('v1', new WglShaderIntegerType())];
    });

    it('should be created with a valid identifier', () => {
        const testCases: string[] = [
            'testFunc', 'testFunc8', '_', 'main', '_8'
        ];
        testCases.forEach((tc, index) => {
            const tcFunc = new WglShaderFunction(tc, variables);
            expect(tcFunc).toBeTruthy();
            expect(tcFunc.name).toEqual(tc);
            expect(tcFunc.scopeName).toBeTruthy();
        });
    });

    it('should not be created if the identifier is invalid', () => {
        const testCases: string[] = [
            '_*', '*a', '8_', 'asdf*asdf'
        ];
        testCases.forEach((tc, index) => {
            expect(() => new WglShaderFunction(tc, variables)).toThrow();
        });
    });

    describe('signature', () => {

        it('should reflect the function\'s parameters', () => {
            const func = new WglShaderFunction('func', variables);
            expect(func.signature).toEqual(signature);
        });

    });

    describe('parse', () => {

        it('should parse an empty function', () => {
            const testCases: WglShaderVariable[][] = [
                [],
                variables.slice(0, 1),
                variables.slice(0, 2)
            ];
            testCases.forEach((tc) => {
                const parser = new WglShaderArgumentListParser();
                const parsedArgList = WglShaderTestingUtil.escapeRegexCharacters(parser.parseDeclaration(tc));
                const func = new WglShaderFunction('func', tc);
                expect(func.parse()).toMatch(new RegExp(
                    '^' + func.signature.return.parse() + '\\s+' + func.name + '\\s*' + parsedArgList + '\\s+\\{\\n+\\}$'
                ));
            });
        });

    });

});
