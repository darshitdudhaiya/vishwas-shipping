import React, { useState, useEffect } from "react";
import { Grid, Card, Checkbox, NativeSelect } from "@mui/material";
import { Table } from "reactstrap";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  faTrash,
  faPencilAlt,
  faPlusSquare,
  faQuestionCircle,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "../../common/IconButton";
import CustomModal from "../../common/models/Modal";
import AccountDetailModal from "../../common/models/AccountDetailModal";
import { accounts } from "../../settings/consts";
import { useNavigate } from "react-router-dom";


const AccountList  = ({ handleCurrentWindow }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [account, setAccount] = React.useState({});    
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalType, setModalType] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    handleCurrentWindow("Account List");
  }, []);


  const handleRowCheckboxChange = (event, rowId) => {
    if (event.target.checked) {
      setCheckedRows([...checkedRows, rowId]);
    } else {
      setCheckedRows(checkedRows.filter((id) => id !== rowId));
    }
  };

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      const allRowIds = Array.from(Array(12).keys()).slice(1);
      setCheckedRows(allRowIds);
    } else {
      setCheckedRows([]);
    }
  };

  const isRowChecked = (rowId) => checkedRows.includes(rowId);

  return (
    <div className="px-3">
      {modalOpen ? () => (modalType)() : null}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <Grid item xs={12} sm={12} md={12} className="mb-3 d-flex">
            <Grid item className="mt-2">
              <IconButton
                type={faPlusSquare}
                bgColor={"#1216ff"}
                className="m-3 flex-grow-0 cursor-pointer"
                onClick={() =>navigate("/home/add-account")}
              />
              <IconButton
                type={faTrash}
                bgColor={"#e2001a"}
                className="m-3 flex-grow-0 cursor-pointer"
                onClick={() => {
                  setModalType("warning");
                  setModalOpen(true);
                }}
              />
              <IconButton
                type={faQuestionCircle}
                bgColor={"#7499fc"}
                className="m-3 flex-grow-0 cursor-pointer fs-2"
                onClick={() => {
                  setModalType("info");
                  setModalOpen(true);
                }}
              />
            </Grid>
            <Grid item className="flex-grow-1 mx-2 d-flex justify-content-end align-middle">
              <span className="my-3">Showing</span>
              <FormControl variant="standard" sx={{ mx: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Rows
                </InputLabel>
                <NativeSelect
                  defaultValue={10}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </NativeSelect>
              </FormControl>
              <span className="my-3 me-3">Entries</span>
            </Grid>
            <Grid item className="flex-grow-2 d-flex justify-content-end">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Card className="shadow">
            <div style={{ maxHeight: "375px", overflow: "auto" }} className="table-container">
              <Table striped className="sticky-header">
                <thead>
                  <tr className="align-middle">
                    <th>
                      <Checkbox
                        checked={checkedRows.length === 12}
                        indeterminate={
                          checkedRows.length > 0 && checkedRows.length < 12
                        }
                        onChange={handleHeaderCheckboxChange}
                      />
                    </th>
                    <th>Name</th>
                    <th>Opening</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Closing</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {accounts.map((account) => {
                    return (
                      <tr key={account.id}>
                        <td>
                          <Checkbox
                            checked={isRowChecked(1)}
                            onChange={(event) => handleRowCheckboxChange(event, 1)}
                          />
                        </td>
                        <td>{account.name}</td>
                        <td>{account.openning}</td>
                        <td>{account.debit}</td>
                        <td>{account.credit}</td>
                        <td>{account.closing}</td>
                        <td>
                          <IconButton
                            type={faTrash}
                            bgColor={"#e2001a"}
                            className="mx-2 cursor-pointer"
                          />
                          <IconButton
                            type={faPencilAlt}
                            bgColor={"#afa013"}
                            className="mx-2 cursor-pointer"
                          />
                          <IconButton
                            type={faEye}
                            bgColor={"#004982"}
                            className="mx-2 cursor-pointer"
                            onClick={() => {
                              setUserModalOpen(true)
                              setAccount(account)
                            }}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <Stack spacing={2} className="d-flex flex-row-reverse my-2">
              <Pagination count={10} color="primary" />
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <CustomModal
        type={modalType}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <AccountDetailModal userModalOpen={userModalOpen} setUserModalOpen={setUserModalOpen} account={account}/>
    </div>
  );
};

export default AccountList  ;
