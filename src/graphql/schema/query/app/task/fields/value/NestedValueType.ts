import { GraphQLObjectType} from 'graphql';
import { IContext, IFieldValue } from '../../../../../../../db/interfaces';
import { ValuesUnion } from './ValuesUnion';

export const NestedValueType: GraphQLObjectType<IFieldValue, IContext> = new GraphQLObjectType({
  name: 'NestedValueType',
  description: 'nested value type',
  fields: () => ({
    ownValue: {
      type: ValuesUnion,
    },
    childrenValue: {
      type: NestedValueType,
    },
  }),
});
