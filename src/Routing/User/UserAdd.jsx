import React from "react";
import {
  Input,
  InputSelectGender,
  InputSelectCategory,
} from "../../components/layout/Input";

const UserAdd = () => {
  return (
    <div className="form-container">
      <h1>Add a user</h1>
      <div className="all-input">
        <Input label="Firstname" name="firstname" type="text" />
        <Input label="Lastname" name="lastname" type="text" />
        <InputSelectGender label="Gender" name="gender" type="text" />
        <InputSelectCategory label="Category" name="category" type="text" />
        <Input label="Email" name="email" type="text" />
        <Input label="Password" name="password" type="password" />
        <Input label="Confirm password" name="confirm" type="password" />
        <Input label="Phone" name="phone" type="text" />
        <Input label="Birthdate" name="birthdate" type="date" />
        <Input label="City" name="city" type="text" />
        <Input label="Country" name="country" type="text" />
        <Input label="Photo" name="photo" type="text" />
      </div>
    </div>
  );
};

export default UserAdd;
