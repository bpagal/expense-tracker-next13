'use client';

import { cloneElement, useState } from 'react';
import './ActionsPopover.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { ExpensesRow } from '../../utils/database.types';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface ActionsPopoverProps {
  expense: ExpensesRow;
}

export default function ActionsPopover({ expense }: ActionsPopoverProps) {
  const handleEdit = () => {
    console.log('💖💛💙💜💚 EDIT');
    console.log(expense.details);
    console.log(expense.id);
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
  const ref = useOutsideClick(() => {
    console.log('💖💛💙💜💚 useOutsideClick');
    setOpen(false);
  });
  const handleOutsideClickStopPropagation = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <div
      className="dropdown text-right"
      onClick={handleOutsideClickStopPropagation}
    >
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu" ref={ref}>
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
