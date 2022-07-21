import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useUserContext } from '../../context/user.context';
import DataTable from '../DataTable';
import DeleteModal from '../DeleteModal';

const UserDataTable: React.FC = () => {

  const userContext = useUserContext();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = (id: string) => {
    setUserId(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setUserId('');
    setOpenModal(false)
  };

  const handleRemoveUser = (id: string) => {
    const index = userContext.users.findIndex((user) => user._id === id);
    const updatedUsers = [...userContext.users];
    updatedUsers.splice(index, 1);
    userContext.setUsers(updatedUsers);
  };

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', minWidth: 300, flex: 1 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'actions', headerName: 'Actions', align: 'center', width: 100, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => navigate(`/users/${params.id}`)}>
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
      <DataTable rows={userContext.users} columns={columns} />
      { openModal &&
        <DeleteModal
          id={userId}
          type={'users'}
          updateContext={handleRemoveUser}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default UserDataTable;
