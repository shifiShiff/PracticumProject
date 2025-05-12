
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({ onLogout }: { onLogout: () => void }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  let firstLetter = "?";

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
    const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "";

      firstLetter = name.charAt(0).toUpperCase();
    } catch {
      firstLetter = "?";
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout(); 
    navigate("/auth");
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ bgcolor: 'rgba(245, 27, 151, 0.93)', width: 40, height: 40 }}>
          {firstLetter}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
