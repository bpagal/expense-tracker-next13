'use client';

import { cloneElement, useRef, useState } from 'react';
import './ActionsPopover.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { ExpensesRow } from '../../utils/database.types';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ExpenseForm } from '../ExpenseForm/ExpenseForm';
import { DeleteExpense } from './DeleteExpense';

interface ActionsPopoverProps {
  expense: ExpensesRow;
}

export default function ActionsPopover({ expense }: ActionsPopoverProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const deleteExpenseRef = useRef<HTMLDialogElement>(null);
  const [dialogAction, setDialogAction] = useState<'edit' | 'copy'>('edit');

  const handleEdit = () => {
    dialogRef.current?.showModal();
  };
  const handleCopy = () => {
    setDialogAction('copy');
    dialogRef.current?.showModal();
  };
  const handleDelete = () => {
    deleteExpenseRef.current?.showModal();
  };

  return (
    <>
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
          <button key="copy" onClick={handleCopy}>
            Copy
          </button>,
          <button key="delete" onClick={handleDelete}>
            Delete
          </button>,
        ]}
      />
      <ExpenseForm
        action={dialogAction}
        selectedExpense={expense}
        ref={dialogRef}
      />
      <DeleteExpense selectedExpense={expense} ref={deleteExpenseRef} />
    </>
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
