import React from "react";
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Input,
  InputSelectGender,
  InputSelectCategory,
  CheckboxForm,
} from "../../components/layout/Input";
import { selectCurrentUser } from "../../store/authSlice.jsx";
import { useAddUserMutation } from "../../store/apiSlice.jsx";

// OK mais sécuriser le formulaire

const UserAdd = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [addUser, { isLoading }] = useAddUserMutation();

  console.log("currentUser", currentUser);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "female",
    category: "Marketing",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    birthdate: "",
    city: "",
    country: "",
    photo:
      "https://i.pinimg.com/736x/67/b2/cc/67b2cc4e28fcf735c303f1d43c1bd698.jpg",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isAdmin: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.confirm.value !== formData.password) {
      message.error("Passwords do not match");
      return;
    }
    const { confirm, ...userData } = formData;
    try {
      const result = await addUser(userData);
      navigate("/users", { replace: true });
      message.success("User added successfully");
    } catch (error) {
      console.log(error);
      message.error("Error adding user");
    }
  };
  return (
    <div className="form-container">
      {currentUser?.isAdmin ? (
        <>
          <h1>Add a user</h1>
          <form onSubmit={handleSubmit}>
            <div className="all-input">
              <Input
                label="Firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
              />
              <Input
                label="Lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
              />
              <InputSelectGender
                label="Gender"
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleChange}
              />
              <InputSelectCategory
                label="Category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Confirm password"
                name="confirm"
                type="password"
                value={formData.confirm}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
              />
              <Input
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                label="Country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
              />
              <Input
                label="Photo"
                name="photo"
                type="text"
                value={formData.photo}
                onChange={handleChange}
              />
              <CheckboxForm
                label="This user is an admin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleCheckboxChange}
              />
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
              >
                Add user
              </Button>
            </div>
          </form>
        </>
      ) : (
        <h1>You are not allowed to add a user</h1>
      )}
    </div>
  );
};

export default UserAdd;
