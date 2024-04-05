"use client";

import { NAV_LINKS } from "@/constants";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { loginTherapist } from "../services/Therapist.service";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if localStorage is available before accessing it
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(token !== null);
    }
  }, []);

  const loginFunction = (e: any) => {
    e.preventDefault();
    loginTherapist(email, password)
      .then((response: any) => {
        localStorage.setItem("token", response.token);
        console.log(response);
        window.location.reload();
      })
      .catch((error: any) => {
        console.error(error);
        alert("Login failed");
      });
  };

  return (
    <>
      <nav className="flexBetween max-container padding-container relative z-30 py-5 shadow-md">
        <Link href="/">
          <Image alt="logo" src="/AudiSense.png" width={60} height={10} />
        </Link>
        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="lg:flexCenter hidden">
          {isLoggedIn ? (
            <Button
              type="button"
              title="Logout"
              icon="/user.svg"
              variant="btn_dark_green"
              onClick={logout}
            />
          ) : (
            <Button
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_green"
              onClick={handleOpen}
            />
          )}
        </div>

        <button
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
        {isMenuOpen && (
          <div className="mt-4">
            <ul className="grid gap-4">
              {NAV_LINKS.map((link) => (
                <Link href={link.href} key={link.key}>
                  {link.label}
                </Link>
              ))}
            </ul>

            {isLoggedIn ? (
              <Button
                type="button"
                title="Logtout"
                icon="/user.svg"
                variant="btn_dark_green"
                onClick={logout}
              />
            ) : (
              <Button
                type="button"
                title="Login"
                icon="/user.svg"
                variant="btn_dark_green"
                onClick={handleOpen}
              />
            )}
          </div>
        )}
      </nav>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Login to the System
              </Typography>

              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="p-4 md:p-5">
                    <form
                      className="space-y-4"
                      action="#"
                      onSubmit={loginFunction}
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="name@company.com"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="flex justify-between">
                        <a
                          href="#"
                          className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                          Lost Password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Login to your account
                      </button>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?{" "}
                        <a
                          href="#"
                          className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                          Create account
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Navbar;
