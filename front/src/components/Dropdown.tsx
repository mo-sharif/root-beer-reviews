import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

interface DropdownProps {
  items: number[];
  label: string;
  selected: number | null;
  MenuButtonComponent?: React.FC<{ selected: number }>;
  MenuItemButtonComponent?: React.FC<{ item: number }>;
  onSelected: (item: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  label,
  selected,
  MenuButtonComponent,
  MenuItemButtonComponent,
  onSelected,
}) => {
  const handleSelect = (item: number) => {
    onSelected(item);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        {/* Menu Button */}
        <div>
          <MenuButton className="inline-flex w-full justify-between items-center bg-white border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {selected
              ? MenuButtonComponent && (
                  <MenuButtonComponent selected={selected} />
                )
              : label}
          </MenuButton>
        </div>

        {/* Dropdown Items */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {items.map((value) => (
                <MenuItem key={value}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700`}
                      onClick={() => handleSelect(value)}
                    >
                      {MenuItemButtonComponent && (
                        <MenuItemButtonComponent item={value} />
                      )}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
