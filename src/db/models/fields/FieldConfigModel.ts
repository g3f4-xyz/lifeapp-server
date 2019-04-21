import { Document, model, Model } from 'mongoose';
import { IField } from '../../interfaces';
import { FieldSchema } from '../../schemas/FieldSchema';
import { registerDiscriminators } from '../registerDiscriminators';

export interface IFieldDocument extends IField, Document {}

export const FieldConfigModel: Model<IFieldDocument> = model('FieldConfig', FieldSchema);

registerDiscriminators();
