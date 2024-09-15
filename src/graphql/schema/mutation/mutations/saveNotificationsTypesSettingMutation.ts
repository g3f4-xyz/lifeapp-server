import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const saveNotificationsTypesSettingMutation =
  mutationWithClientMutationId({
    name: 'SaveNotificationsTypesSetting',
    inputFields: {
      types: {
        type: new GraphQLList(
          new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'SaveNotificationsTypesSettingTypesInput',
              fields: () => ({
                enabled: {
                  type: new GraphQLNonNull(GraphQLBoolean),
                },
                taskTypeId: {
                  type: new GraphQLNonNull(GraphQLString),
                },
              }),
            }),
          ),
        ),
      },
    },
    outputFields: {
      savedTypes: {
        type: new GraphQLList(
          new GraphQLNonNull(
            new GraphQLObjectType({
              name: 'SaveNotificationsTypesSettingTypesOutput',
              fields: () => ({
                enabled: {
                  type: new GraphQLNonNull(GraphQLBoolean),
                },
                taskTypeId: {
                  type: new GraphQLNonNull(GraphQLString),
                },
              }),
            }),
          ),
        ),
      },
    },
    mutateAndGetPayload: async ({ types }, { settingsService }: Context) => {
      try {
        const savedTypes =
          await settingsService.updateNotificationsTypes(types);

        return { savedTypes };
      } catch (error) {
        return error;
      }
    },
  });
