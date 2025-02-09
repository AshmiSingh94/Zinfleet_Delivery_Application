import styled from "@emotion/styled";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import logo from "../../../assets/images/logo.png";
import Logo2 from "../../../assets/images/warehouse.svg";
import { Menu, MenuItem, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { setLoading } from "../../../store/rootslice";
import { logout } from "../../../store/authSlice";
import NotificationList from "../../fleets/components/Notifications";
import { UserType } from "../../../types/user";

const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;
const NavbarRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Logo = styled.img`
  height: 27px;
  width: 137px;
  position: relative;
  left: 60px;
`;
const LogoWrapper = styled.div`
  height: 98px;
  width: 264px;
  border-right: 5px solid #efefef;
  align-items: center;
  display: flex;
`;
const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
  gap: 20px;
  position: relative;
`;
const SearchIcon = styled.div`
  display: flex;
  position: absolute;
  padding: 10px;
`;
const InputField = styled.input`
  padding: 15px 15px 15px 40px;
  width: 306px;
  border-radius: 9px;
  background-color: #f6f6f6;
  border: none;
  font-family: Poppins, Arial, sans-serif;
`;
const Title = styled.div`
  display: flex;
`;

const Divider = styled.div`
  width: 3px;
  background-color: #efefef;
  height: 50px;
`;
export const NavBar = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getNavBarContext = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/order":
        return "Order Managment";
      case "/settings":
        return "Settings";
      case "/drivermanagement":
        return "Driver Managment";
      default:
        return "";
    }
  };
  const logoutUser = () => {
    setAnchorEl(null);
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(logout())
      navigation('/')
      dispatch(setLoading(false));
    }, 1000);

  }
  return (
    <Navbar>
      <NavbarRight>
        <LogoWrapper>
          <Logo src={user?.type === UserType.WAREHOUSE_USER ? Logo2 : logo} />
        </LogoWrapper>

        <Title>
          <Typography>{getNavBarContext()}</Typography>
        </Title>
      </NavbarRight>
      <NavbarLeft>
        <SearchIcon>
          <SearchOutlinedIcon sx={{ color: grey[500] }} />
        </SearchIcon>
        <InputField type="text" placeholder="Search here" />
        <Divider></Divider>
        <NotificationList />
        <IconButton onClick={handleClick}>
          <PermIdentityOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>{user?.name}</MenuItem>
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </Menu>
      </NavbarLeft>
    </Navbar>
  );
};
