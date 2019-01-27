import { nodeDefinitions } from 'graphql-relay';
import { idFetcher } from './idFetcher';
import { typeResolver } from './typeResolver';

export const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);
