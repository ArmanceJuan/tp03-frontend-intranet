import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, message, Spin } from "antd";
import {
  Input,
  InputSelectGender,
  InputSelectCategory,
  CheckboxForm,
} from "../../components/layout/Input";
import { selectCurrentUser } from "../../store/authSlice.jsx";
import { useGetUserByIdQuery, useEditUserMutation } from "../../store/apiSlice";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  console.log("user id", id);

  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useEditUserMutation();

  console.log("data", data);
  console.log("currentUser", currentUser);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    category: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    birthdate: "",
    city: "",
    country: "",
    photo: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (data && data.user) {
      const user = data.user;
      const formattedDate = user.birthdate
        ? new Date(user.birthdate).toISOString().split("T")[0]
        : "";

      setFormData({
        firstname: data.user.firstname || "",
        lastname: data.user.lastname || "",
        gender: data.user.gender || "",
        category: data.user.category || "",
        email: data.user.email || "",
        password: "",
        phone: data.user.phone || "",
        birthdate: data.user.birthdate || "",
        city: data.user.city || "",
        country: data.user.country || "",
        photo: data.user.photo || "",
        isAdmin: data.user.isAdmin || false,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isAdmin: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...formData };
    if (!userData.password) {
      delete userData.password;
    }

    try {
      await updateUser({ id, ...userData }).unwrap();
      message.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.log(error);
      message.error("Error adding user");
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }
  if (error) {
    return <p>Error, please try again</p>;
  }

  const canEdit = currentUser?.isAdmin || currentUser?.id === id;

  return (
    <div className="form-container">
      {currentUser?.isAdmin ? (
        <>
          <h1>Edit user</h1>
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
                placeholder="Leave empty if you don't want to change it"
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
              {currentUser?.isAdmin && (
                <CheckboxForm
                  label="This user is an admin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleCheckboxChange}
                />
              )}
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
              >
                Edit user
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

export default UserEdit;
