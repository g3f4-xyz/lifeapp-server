import { Document, model, Model } from 'mongoose';
import { IField } from '../interfaces';
import { FieldSchema } from '../schemas/FieldSchema';

export interface IFieldDocument extends IField, Document {}

export const FieldModel: Model<IFieldDocument> = model('Field', FieldSchema);
