import { Document } from 'mongoose';
import { Field } from '../../interfaces';
import { registerFieldsDiscriminators } from '../registerFieldsDiscriminators';

export interface FieldDocument extends Omit<Field, 'id'>, Document {}

registerFieldsDiscriminators();
