import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useUserContext } from '../../context/user.context';
import DataTable from '../DataTable';
import DeleteModal from '../DeleteModal';
import { DataType } from '../../models/data.model';

const UserDataTable: React.FC = () => {

  const userContext = useUserContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = (id: string, email: string) => {
    setUserId(id);
    setUserEmail(email);
    setOpenModal(true);
  };

  const handleClose = () => {
    setUserId('');
    setUserEmail('');
    setOpenModal(false)
  };

  const handleRemoveUser = (id: string) => {
    const index = userContext.users.findIndex((user) => user._id === id);
    const updatedUsers = [...userContext.users];
    updatedUsers.splice(index, 1);
    userContext.setUsers(updatedUsers);
  };

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 200, hide: isSmallScreen ? true : false },
    { field: 'lastName', headerName: 'Last Name', width: 200, hide: isSmallScreen ? true : false },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
    { field: 'role', headerName: 'Role', width: 100, hide: isSmallScreen ? true : false },
    { field: 'actions', headerName: 'Actions', align: 'center', width: 100, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => navigate(`/users/${params.id}`)}>
              <Edit fontSize='small' />
            </IconButton>
            <IconButton onClick={() => handleOpen(String(params.id), params.row.email)}>
              <Delete fontSize='small' />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataTable rows={userContext.users} columns={columns} type={DataType.USER} />
      { openModal &&
        <DeleteModal
          id={userId}
          name={userEmail}
          type={DataType.USER}
          updateContext={handleRemoveUser}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default UserDataTable;
