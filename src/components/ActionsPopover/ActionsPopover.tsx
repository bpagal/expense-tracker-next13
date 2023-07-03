'use client';

import { cloneElement, useState } from 'react';
import './ActionsPopover.css';
import { AiOutlineMenu } from 'react-icons/ai';

export default function ActionsPopover() {
  const handleEdit = () => {
    console.log('clicked EDIT');
  };

  return (
    <Dropdown
      trigger={
        <button>
          <AiOutlineMenu className="text-right" />
        </button>
      }
      menu={[
        <button key="edit" onClick={handleEdit}>
          Edit
        </button>,
      ]}
    />
  );
}

interface DropdownProps {
  trigger: JSX.Element;
  menu: JSX.Element[];
}
function Dropdown({ trigger, menu }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item bg-gray-800 hover:bg-gray-900">
              {cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
