import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { ModalContainer, TextInputContainer } from "../../common";
import DataTableContainer from "../../common/dataTable/dataTableContainer";
import "./userManagementStyle.scss";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  initialUserValue,
  UserValidationSchema,
} from "../../utils/userManagementContants";

const UserManagementView = ({
  manageUser,
  handlePasswordShow,
  handleUser,
  handleSubmit,
  handleDeleteUser,
  store,
}) => {
  const columns = [
    {
      accessorkey: "firstName",
      header: "First Name",
      cell: ({ row }) => row.original?.firstName || "-",
    },
    {
      accessorkey: "lastName",
      header: "Last Name",
      cell: ({ row }) => row.original?.lastName || "-",
    },
    {
      accessorkey: "gender",
      header: "Gender",
      cell: ({ row }) => row.original?.gender || "-",
    },
    {
      accessorkey: "email",
      header: "Email",
      cell: ({ row }) => row.original?.email || "-",
    },
    {
      accessorkey: "role.name",
      header: "Role",
      cell: ({ row }) => row.original?.role?.name || "-",
    },
    {
      accessorkey: "country",
      header: "Country",
      cell: ({ row }) => row.original?.country || "-",
    },
    {
      accessorkey: "state",
      header: "State",
      cell: ({ row }) => row.original?.state || "-",
    },
    {
      accessorkey: "city",
      header: "City",
      cell: ({ row }) => row.original?.city || "-",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const client = row.original;
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleUser(client?._id)}
            >
              <FiEdit2 size={16} />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteUser(client._id)}
            >
              <FiTrash2 size={16} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box className="user-management">
      {/* <div className="user-management__header">
        <h1 className="user-management__title">User Management</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleCreateUserModal}
          startIcon={<MdOutlineGroupAdd />}
        >
          Add User
        </Button>
      </div> */}

      <DataTableContainer
        heading={"User Management"}
        addItem={"Add"}
        handleAdd={handleUser}
        startIcon={<FiPlus />}
        data={store?.userList || []}
        columns={columns}
        loading={store?.loading}
        totalItems={store?.totalItems}
        // fetchData={fetchClients}
      />

      {/* Create New User */}
      <ModalContainer
        open={manageUser?.isCreateUserModalOpen}
        onClose={toggleCreateUserModal}
        title="Create New User"
        initialValues={initialUserValue}
        validationSchema={UserValidationSchema}
        formikHandleFormSubmit={handleSubmit}
        size="sm"
      >
        {(formikProps) => (
          <div className="user-management__form">
            <TextInputContainer
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              required
              formikProps={formikProps}
              autoComplete="given-name"
            />
            <TextInputContainer
              name="lastName"
              label="Last Name"
              placeholder="Enter your Last name"
              required
              formikProps={formikProps}
              autoComplete="given-name"
            />
            <TextInputContainer
              name="gender"
              label="Gender"
              placeholder="Enter your gender"
              required
              formikProps={formikProps}
              autoComplete="given-name"
            />
            <TextInputContainer
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email address"
              required
              formikProps={formikProps}
              autoComplete="email"
            />
            <TextInputContainer
              name="role"
              label="Role"
              select
              required
              formikProps={formikProps}
              className="full-width"
              value={formikProps.values.client}
            >
              <MenuItem value="Select your role" disabled>
                Select your role
              </MenuItem>
              {/* {clientList && clientList.length > 0 ? (
                clientList.map((client) => (
                  <MenuItem key={client._id} value={client._id}>
                    {client.businessName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No clients available</MenuItem>
              )} */}
            </TextInputContainer>

            {/* <TextInputContainer
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              required
              formikProps={formikProps}
              autoComplete="tel"
              inputProps={{ maxLength: 10 }}
            /> */}
            <TextInputContainer
              name="password"
              label="Password"
              type={manageUser?.showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              formikProps={formikProps}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handlePasswordShow("showPassword")}
                      edge="end"
                    >
                      {manageUser?.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextInputContainer
              name="confirmPassword"
              label="Confirm Password"
              type={manageUser?.showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              required
              formikProps={formikProps}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handlePasswordShow("showConfirmPassword")}
                      edge="end"
                    >
                      {manageUser?.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box className="modal-actions">
              <Button
                type="button"
                variant="contained"
                className="cancel-btn"
                disabled={formikProps.isSubmitting}
                onClick={toggleCreateUserModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="submit-btn"
                disabled={formikProps.isSubmitting}
              >
                Create User
              </Button>
            </Box>
          </div>
        )}
      </ModalContainer>
    </Box>
  );
};

export default UserManagementView;
