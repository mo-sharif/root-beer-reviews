import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import StarRating from "components/StarRating";

interface RatingDropdownProps {
  label: string;
  selectedRating: number | null;
  onRatingSelect: (rating: number) => void;
}

const RatingDropdown: React.FC<RatingDropdownProps> = ({
  label,
  selectedRating,
  onRatingSelect,
}) => {
  const handleRatingSelect = (rating: number) => {
    onRatingSelect(rating);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        {/* Menu Button */}
        <div>
          <Menu.Button className="inline-flex w-full justify-between items-center bg-white border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {selectedRating ? (
              <div className="flex items-center">
                <StarRating rating={selectedRating} />
              </div>
            ) : (
              label
            )}
          </Menu.Button>
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
          <Menu.Items className="absolute mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <Menu.Item key={value}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700`}
                      onClick={() => handleRatingSelect(value)}
                    >
                      <StarRating rating={value} />
                      <span className="ml-2">
                        {value} Star{value > 1 ? "s" : ""}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default RatingDropdown;
