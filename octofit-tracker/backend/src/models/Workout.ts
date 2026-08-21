import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  exercises: string[];
  targetMuscleGroups: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    duration: { type: Number, required: true },
    exercises: [String],
    targetMuscleGroups: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
