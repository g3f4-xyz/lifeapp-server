import { Document } from 'mongoose';
import { Field } from '../../interfaces';
import { registerFieldsDiscriminators } from '../registerFieldsDiscriminators';

export interface FieldDocument extends Omit<Field, 'id' | '_id'>, Document {}

registerFieldsDiscriminators();
