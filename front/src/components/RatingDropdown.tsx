import StarRating from "components/StarRating";
import Dropdown from "components/Dropdown";

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
  return (
    <Dropdown
      items={[1, 2, 3, 4, 5]}
      label={label}
      selected={selectedRating}
      onSelected={onRatingSelect}
      MenuButtonComponent={({ selected }) => (
        <div className="flex items-center">
          <StarRating rating={selected} />
        </div>
      )}
      MenuItemButtonComponent={({ item }) => (
        <>
          <StarRating rating={item} />
          <span className="ml-2">
            {item} Star{item > 1 ? "s" : ""}
          </span>
        </>
      )}
    />

  );
};

export default RatingDropdown;
