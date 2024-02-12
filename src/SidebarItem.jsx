import React from 'react';
import { ListItem, ListItemPrefix } from '@material-tailwind/react';

const SidebarItem = ({icon, text, isActive, onClick}) => {
    const baseClasses = 'mt-6 cursor-pointer';
    const activeClasses = 'text-violet-500';
    const inactiveClasses = 'text-black-500';
    
    return (
        <ListItem
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            onClick={onClick} >
                <ListItemPrefix>{icon}</ListItemPrefix>
                <span className='pl-4 text-lg'>{text}</span>
            </ListItem>
    );
};

export default SidebarItem;