import { TestBed, inject } from '@angular/core/testing';
import { WglShaderBlock } from './wgl-shader-block';
import { ShaderAbstractStatement } from '../../../../../api/shaders/source/statement/shader-abstract-statement';
import { WglShaderMatrixLiteral } from '../expression/rvalues/wgl-shader-matrix-literal';
import { WglShaderAssignment } from '../expression/operators/binary/wgl-shader-assignment';
import { WglShaderVariable } from '../expression/lvalues/wgl-shader-variable';
import { WglShaderIntegerType } from '../expression/types/wgl-shader-integer-type';
import { WglShaderIntegerLiteral } from '../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../testing/wgl-shader-testing-util';
import { WglShaderStatement } from './wgl-shader-statement';

describe(WglShaderBlock.name, () => {

    let statements: ShaderAbstractStatement[];
    let block: WglShaderBlock;

    beforeEach(() => {
        statements = [
            new WglShaderStatement(new WglShaderIntegerLiteral(10)),
            new WglShaderStatement(new WglShaderAssignment(
                new WglShaderVariable('foo', new WglShaderIntegerType()), new WglShaderIntegerLiteral(-3)
            )),
            new WglShaderStatement(new WglShaderMatrixLiteral(2, 2)),
        ];
        block = new WglShaderBlock(statements);
    });

    it('should be created', () => {
        expect(block).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse a set of statements', () => {
            const regex0 = WglShaderTestingUtil.escapeRegexCharacters(statements[0].parse());
            const regex1 = WglShaderTestingUtil.escapeRegexCharacters(statements[1].parse());
            const regex2 = WglShaderTestingUtil.escapeRegexCharacters(statements[2].parse());
            const regex = new RegExp('^\\{\\n\\s*' + regex0 + '\\n\\s*' + regex1 + '\\n\\s*' + regex2 + '\\n\\}$');
            expect(block.parse()).toMatch(regex);
        });

    });

});
