import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useExerciseContext } from '../../context/exercise.context';
import { DataType } from '../../models/data.model';
import DataTable from '../DataTable';
import DeleteModal from '../DeleteModal';

const ExerciseDataTable: React.FC = () => {

  const exerciseContext = useExerciseContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const [exerciseId, setExerciseId] = useState<string>('');
  const [exerciseTitle, setExerciseTitle] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = (id: string, title: string) => {
    setExerciseId(id);
    setExerciseTitle(title);
    setOpenModal(true);
  };

  const handleClose = () => {
    setExerciseId('');
    setExerciseTitle('')
    setOpenModal(false)
  };

  const handleRemoveExercise = (id: string) => {
    const index = exerciseContext.exercises.findIndex((exercise) => exercise._id === id);
    const updatedExercises = [...exerciseContext.exercises];
    updatedExercises.splice(index, 1);
    exerciseContext.setExercises(updatedExercises);
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1 },
    { field: 'categories', headerName: 'Categories', width: 300, hide: isSmallScreen ? true : false },
    { field: 'actions', headerName: 'Actions', align: 'center', width: 100, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => navigate(`/exercises/${params.id}`)}>
              <Edit fontSize='small' />
            </IconButton>
            <IconButton onClick={() => handleOpen(String(params.id), params.row.title)}>
              <Delete fontSize='small' />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataTable rows={exerciseContext.exercises} columns={columns} type={DataType.EXERCISE} />
      { openModal &&
        <DeleteModal
          id={exerciseId}
          name={exerciseTitle}
          type={DataType.EXERCISE}
          updateContext={handleRemoveExercise}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default ExerciseDataTable;
