import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext, IFieldMeta } from '../../../db/interfaces';

export const SwitchMetaType: GraphQLObjectType<IFieldMeta, IContext> = new GraphQLObjectType({
  name: 'SwitchMetaType',
  description: 'switch meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    label: {
      description: 'label field description',
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
