import { DiceGroup, DIE_SIZES, MAX_DICE_PER_GROUP } from "../rolls";

const PairedRoll = ({
  groups,
  modifier,
  handleCountChange,
  handleSidesChange,
  handleModifierChange,
  addGroup,
  removeGroup,
}: {
  groups: DiceGroup[];
  modifier: number;
  handleCountChange: (id: number, count: number) => void;
  handleSidesChange: (id: number, sides: number) => void;
  handleModifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addGroup: () => void;
  removeGroup: (id: number) => void;
}) => {
  return (
    <>
      <hr className="inputRowFull" />
      {groups.map((group, i) => (
        <div className="inputRow" key={group.id}>
          <span className="inputLabel">
            {i === 0 ? "Paired roll of" : "plus"}
          </span>
          <input
            type="number"
            min={0}
            max={MAX_DICE_PER_GROUP}
            aria-label={`Paired dice ${i + 1} count`}
            value={group.count}
            onChange={(e) =>
              handleCountChange(group.id, Number(e.currentTarget.value))
            }
          />
          <span className="inputSuffix">
            <select
              aria-label={`Paired dice ${i + 1} size`}
              value={group.sides}
              onChange={(e) =>
                handleSidesChange(group.id, Number(e.currentTarget.value))
              }
            >
              {DIE_SIZES.map((sides) => (
                <option key={sides} value={sides}>
                  d{sides}
                </option>
              ))}
            </select>
            <button onClick={() => removeGroup(group.id)}>Remove</button>
          </span>
        </div>
      ))}
      <div className="inputRowFull">
        <button onClick={addGroup}>Add paired dice</button>
      </div>
      {groups.length > 0 && (
        <label className="inputRow">
          <span className="inputLabel">plus</span>
          <input
            type="number"
            value={modifier}
            onChange={handleModifierChange}
          />
          <span className="inputSuffix">flat modifier</span>
        </label>
      )}
    </>
  );
};

export default PairedRoll;
