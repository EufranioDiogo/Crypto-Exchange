import { AppBar, Button, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import farmer from "../assets/farmer.png";

const Navbar = (props) => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const isCurretRoute = (route) => pathname === route;

  if (pathname.toLocaleLowerCase().includes("/register"))
    return (
      <div>
        <Button
          disableElevation
          variant="ghost"
          color={isCurretRoute("/dashboard") ? "secondary" : "inherit"}
          onClick={() => push("/dashboard")}
          className="m-4 font-weight-bold"
        >
          Ir para Dashboard
        </Button>
      </div>
    );

  return (
    <div className="flex-grow-1">
      <AppBar variant="elevation" position="fixed">
        <div className="px-4 d-flex flex-row align-items-center justify-between">
          <div className="d-flex flex-grow-1 flex-row align-items-center">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img
                src={farmer}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />
            </IconButton>

            <Typography variant="h6" className="font-weight-bold">
              UCAN Exchange
            </Typography>

            <Button
              disableElevation
              variant={isCurretRoute("/dashboard") ? "contained" : "ghost"}
              color={isCurretRoute("/dashboard") ? "secondary" : "inherit"}
              onClick={() => push("/dashboard")}
              className="ml-5 font-weight-bold"
            >
              Dashboard
            </Button>

            <Button
              disableElevation
              variant={isCurretRoute("/stats") ? "contained" : "ghost"}
              color={isCurretRoute("/stats") ? "secondary" : "inherit"}
              onClick={() => push("/stats")}
              className="mx-3 font-weight-bold"
            >
              Estatísticas
            </Button>

            {/**
               *
               *  <Button
                          disableElevation
                          variant={isCurretRoute("/exchange") ? "contained" : "ghost"}
                          color={isCurretRoute("/exchange") ? "secondary" : "inherit"}
                          onClick={() => push("/exchange")}
                          className="font-weight-bold"
                        >
                          Exchange
                        </Button>

          <Typography className="font-weight-bold">{props.account}</Typography>

              */}
          </div>

        </div>
      </AppBar>
    </div>
  );
};

export default Navbar;
