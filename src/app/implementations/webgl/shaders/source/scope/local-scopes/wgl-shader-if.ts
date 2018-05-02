import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

export class WglShaderIf extends WglShaderLocalScope implements ShaderIf {

    public readonly condition: ShaderExpression;

    public get scopeName(): string {
        return 'if';
    }

    constructor(condition: ShaderExpression) {
        super();
        this.condition = condition;
        this.makeParentOf(new WglShaderBlock());
    }

    public elseIf(condition: ShaderExpression): any {

    }

    public else(): any {

    }

    public parse(): string {
        return null;
    }

}
