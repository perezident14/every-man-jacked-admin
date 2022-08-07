export enum ExerciseCategory {
  CHEST = 'CHEST',
  BACK = 'BACK',
  ARMS = 'ARMS',
  SHOULDERS = 'SHOULDERS',
  LEGS = 'LEGS',
  PUSH = 'PUSH',
  PULL = 'PULL',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  HIIT = 'HIIT',
}

export interface Exercise {
  _id: string
  title: string
  categories: ExerciseCategory[]
}

export interface NewExercise {
  title: string
  categories: ExerciseCategory[]
}

export const initialExerciseRender: Exercise = {
  _id: '',
  title: '',
  categories: [],
};

export const initialExerciseData: NewExercise = {
  title: '',
  categories: [],
};
