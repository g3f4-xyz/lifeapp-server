import { Document, model, Model } from 'mongoose';
import { Field } from '../../interfaces';
import { FieldSchema } from '../../schemas/FieldSchema';
import { registerFieldsDiscriminators } from '../registerFieldsDiscriminators';

export interface FieldDocument extends Field, Document {}

export const FieldConfigModel: Model<FieldDocument> = model(
  'FieldConfig',
  FieldSchema,
);

registerFieldsDiscriminators();
