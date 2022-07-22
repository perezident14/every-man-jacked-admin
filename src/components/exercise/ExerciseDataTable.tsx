import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useExerciseContext } from '../../context/exercise.context';
import DataTable from '../DataTable';
import DeleteModal from '../DeleteModal';

const ExerciseDataTable: React.FC = () => {

  const exerciseContext = useExerciseContext();
  const navigate = useNavigate();

  const [exerciseId, setExerciseId] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = (id: string) => {
    setExerciseId(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setExerciseId('');
    setOpenModal(false)
  };

  const handleRemoveUser = (id: string) => {
    const index = exerciseContext.exercises.findIndex((exercise) => exercise._id === id);
    const updatedExercises = [...exerciseContext.exercises];
    updatedExercises.splice(index, 1);
    exerciseContext.setExercises(updatedExercises);
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 300, flex: 1 },
    { field: 'categories', headerName: 'Categories', width: 300 },
    { field: 'actions', headerName: 'Actions', align: 'center', width: 100, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => navigate(`/exercises/${params.id}`)}>
              <Edit fontSize='small' />
            </IconButton>
            <IconButton onClick={() => handleOpen(String(params.id))}>
              <Delete fontSize='small' />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataTable rows={exerciseContext.exercises} columns={columns} type={'exercises'} />
      { openModal &&
        <DeleteModal
          id={exerciseId}
          type={'exercises'}
          updateContext={handleRemoveUser}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default ExerciseDataTable;
