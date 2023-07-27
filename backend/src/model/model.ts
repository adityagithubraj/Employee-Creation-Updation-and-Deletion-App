
import mongoose, { Schema, Document } from 'mongoose';

export interface Employee extends Document {
  name: string;
  title: string;
  department: string;
  annualSalary: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ['HR', 'Tech', 'Product', 'Leadership'],
      required: true,
    },
    annualSalary: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);




const EmployeeModel = mongoose.model<Employee>('Employee', EmployeeSchema);

export default EmployeeModel;
