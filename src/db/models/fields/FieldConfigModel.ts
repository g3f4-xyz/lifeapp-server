import { Document, model, Model } from 'mongoose';
import { IField } from '../../interfaces';
import { FieldSchema } from '../../schemas/FieldSchema';
import { registerFieldsDiscriminators } from '../registerFieldsDiscriminators';

export interface IFieldDocument extends IField, Document {}

export const FieldConfigModel: Model<IFieldDocument> = model('FieldConfig', FieldSchema);

registerFieldsDiscriminators();
