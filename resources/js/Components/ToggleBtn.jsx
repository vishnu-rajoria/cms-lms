import { useEffect, useState } from "react";
export default function ToggleBtn({ value, options, name, ...props }) {
    const isChecked = value === "checked" ? true : false;
    const [checked, setChecked] = useState(isChecked);
    console.log(`Checked :${checked}`);
    let checkedKnobClasses = "";
    let checkedKnobContainerClasses = "";

    if (checked) {
        checkedKnobClasses = "translate-x-full";
        checkedKnobContainerClasses = "bg-green-500";
    } else {
        checkedKnobClasses = "translate-x-0";
        checkedKnobContainerClasses = "bg-red-700";
    }

    return (
        <div
            data-status={checked}
            onClick={(event) => {
                event.stopPropagation();

                setChecked(!checked);
                props.onClick(event);
            }}
            className="toggle-btn flex items-center gap-2"
        >
            <input
                type="number"
                min={0}
                max={1}
                name={name}
                defaultValue={checked ? 1 : 0}
                hidden
            />

            <span className="text-gray-300">
                {checked ? options.checked : options.unchecked}
            </span>
            <div
                className={
                    "pointer-events-none inline-block knob-container rounded-[50px]  w-[60px] h-[30px] transition-all duration-300 shadow-inner " +
                    checkedKnobContainerClasses
                }
            >
                <div
                    className={
                        " pointer-events-none knob rounded-full w-[30px] h-full bg-indigo-500 transition-all duration-200 bg-slate-900 " +
                        checkedKnobClasses
                    }
                ></div>
            </div>
        </div>
    );
}
