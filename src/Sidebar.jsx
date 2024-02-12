import { React, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, List } from "@material-tailwind/react";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { CalendarMonthOutlined, PersonOutlineOutlined, ExitToAppOutlined } from '@mui/icons-material';
import GreyMetricsLogo from './styles/sidebar-logo.png';
import SidebarItem from './SidebarItem.jsx';
import './Sidebar.css';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('Overview');
  const navigate = useNavigate();
  
    const handleItemClick = (item) => {
        setActiveItem((prevActiveItem) => (prevActiveItem === item ? null : item));
      };

    const logOut = () => {
      navigate("/");
    }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl">
      <button onClick={logOut} className='flex flex-row-reverse hover:text-red-500'>Logout<ExitToAppOutlined /></button>
      <div className="mb-2 p-4 flex flex-row">
          <img
            src={GreyMetricsLogo}
            alt="BASE logo"
            className="w-12 h-12 rounded-full"
          />
          <Typography
            variant="h4"
            color="black"
            className="pl-5 mt-2 font-bold text-3xl"
          >
            BudgetO
          </Typography>
        </div>
        <List>
        <Link to="/overview" className='no-underline text-black'>
          <SidebarItem
            icon={<DashboardCustomizeOutlinedIcon className="h-5 w-5" />}
            text="Overview"
            isActive={activeItem === 'Overview'}
            onClick={() => handleItemClick('Overview')}
          />
          </Link>

          <Link to="/upload" className='no-underline text-black'>
          <SidebarItem
            icon={<FileUploadOutlinedIcon className="h-5 w-5" />}
            text="Upload"
            isActive={activeItem === 'Upload'}
            onClick={() => handleItemClick('Upload')}
          />
          </Link>

          <Link to="/transactions" className='no-underline text-black'>
          <SidebarItem
            icon={<ListOutlinedIcon className="h-5 w-5" />}
            text="Transactions"
            isActive={activeItem === 'Transactions'}
            onClick={() => handleItemClick('Transactions')}
          />
          </Link>

          <Link to="/calendar" className='no-underline text-black'>
          <SidebarItem
            icon={<CalendarMonthOutlined className="h-5 w-5" />}
            text="Calendar"
            isActive={activeItem === 'Calendar'}
            onClick={() => handleItemClick('Calendar')}
          />
          </Link>

          <Link to="/about" className='no-underline text-black'>
          <SidebarItem
            icon={<PersonOutlineOutlined className="h-5 w-5" />}
            text="About"
            isActive={activeItem === 'About'}
            onClick={() => handleItemClick('About')}
          />
          </Link>
          </List>
    </Card>
  )
}

export default Sidebar;

