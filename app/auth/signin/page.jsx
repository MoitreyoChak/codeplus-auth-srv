"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

function page() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      window.location.href = "/";
      // router.push("/");
    }
  }

  return (
    <div>
      <form class="position-absolute top-50 start-50 translate-middle">
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

export default page;
