import React from "react";
import { useState } from "react";
import { Button, message, Alert } from "antd";
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

const UserAdd = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [addUser, { isLoading, error: apiError }] = useAddUserMutation();

  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

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
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isAdmin: e.target.checked });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstname.trim()) {
      errors.firstname = "Firstname is required";
    } else if (formData.firstname.length < 3) {
      errors.firstname = "Firstname must be at least 3 characters";
    }

    if (!formData.lastname.trim()) {
      errors.lastname = "Lastname is required";
    } else if (formData.lastname.length < 3) {
      errors.lastname = "Lastname must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!formData.email.includes("@") && !formData.email.length < 3) {
      errors.email = "Email must be valid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirm.trim()) {
      errors.confirm = "Confirm password is required";
    } else if (formData.password !== formData.confirm) {
      errors.confirm = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    }
    if (!formData.birthdate.trim()) {
      errors.birthdate = "Birthdate is required";
    }
    if (!formData.city.trim()) {
      errors.city = "City is required";
    }
    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }
    if (!formData.photo.trim()) {
      errors.photo = "Photo is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setFormErrors({});
    setGeneralError("");
    const { confirm, ...userData } = formData;

    try {
      const result = await addUser(userData);
      navigate("/users", { replace: true });
      message.success("User added successfully");
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        if (error.data?.message === "Email already in use") {
          setFormErrors({
            ...formErrors,
            email: "Email already in use",
          });
        } else if (error.data?.message.includes("required fields")) {
          setGeneralError("Please fill all required fields");
        } else {
          setGeneralError(error.data?.message || "Error adding user");
        }
      } else {
        setGeneralError("Error adding user, please try again");
      }
    }
  };
  return (
    <div className="form-container">
      {currentUser?.isAdmin ? (
        <>
          <h1>Add a user</h1>
          {generalError && (
            <Alert
              message="Erreur"
              description={generalError}
              type="error"
              showIcon
              style={{ margin: "20px" }}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="all-input">
              <Input
                label="Firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
                error={formErrors.firstname}
              />
              <Input
                label="Lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                error={formErrors.lastname}
              />
              <InputSelectGender
                label="Gender"
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleChange}
                error={formErrors.gender}
              />
              <InputSelectCategory
                label="Category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                error={formErrors.category}
              />
              <Input
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
              />
              <Input
                label="Confirm password"
                name="confirm"
                type="password"
                value={formData.confirm}
                onChange={handleChange}
                error={formErrors.confirm}
              />
              <Input
                label="Phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
              />
              <Input
                label="Birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                error={formErrors.birthdate}
              />
              <Input
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                error={formErrors.city}
              />
              <Input
                label="Country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                error={formErrors.country}
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
        <Alert
          message="Acces denied"
          description="You are not allowed to add a user"
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default UserAdd;
