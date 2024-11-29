import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const TableUser = () => {
  const [listUser, setListUser] = useState([]); // Khởi tạo state lưu danh sách user

  // Hàm gọi API để lấy danh sách user
  const getAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/userAuth");
      setListUser(res.data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Hàm xử lý cập nhật user
  const handleUpdate = (id) => {
    console.log(`Update user with ID: ${id}`);
    // Viết logic update user tại đây
  };

  // Hàm xử lý xóa user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/userAuth/${id}`);
      // Cập nhật lại danh sách user sau khi xóa
      setListUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getAllUser(); // Gọi API khi component mount
  }, []);

  return (
    <div className="App container ">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th> {/* Cột Action */}
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 ? (
            listUser.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>

                <td>{user.username}</td>
                <td>{user.role}</td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableUser;
