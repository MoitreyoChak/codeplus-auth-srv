"use client";
import { useState } from "react";
import { register } from "@/actions/register";
import { signIn } from "next-auth/react";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const r = await register({
      email,
      password,
      name: name,
    });

    if (r?.error) {
      console.log("user already exists");
      return;
    } else {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div>
      <form class="position-absolute top-50 start-50 translate-middle">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">name</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control mx-2 my-2"
              placeholder="tommy"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">email</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control mx-2 my-2"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control mx-2 my-2"
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary mb-2"
          onClick={handleSubmit}
        >
          Confirm identity
        </button>
      </form>
    </div>
  );
}
