import Image from "next/image";
import React, { useEffect, useState } from "react";

interface List {
    id: number;
    task: string;
    isImportant: boolean;
    isCheck: boolean
}
export default function AddTodo({ setList, list }: { setList: (list: List[]) => void; list: List[] }) {
    const [value, setValue] = useState("");
    // const [list, setList] = useState<List[]>([] as List[]);
    const [inError, setInError] = useState(false);
    const [showTaskInput, setShowTaskInput] = useState(false);

    const handleOnChange = (e: any) => {
        setValue(e.target.value);
        setInError(false);
    };

    const clickOnSubmit = () => {
        if (!value) {
            setInError(true);
            return;
        }
        const nextKey = Object.keys(list).length + 1;

        setList([...list, { id: nextKey, task: value, isImportant: false, isCheck: false }]);
        setValue("");
        setInError(false);
        localStorage.setItem(
            "todo",
            JSON.stringify([
                ...list,
                { id: nextKey, task: value, isImportant: false, isCheck: false },
            ])
        );
    };
    return (
        <div>
            <div className="">
                <p
                    className="text-red-300 my-2 flex gap-1"
                    onClick={() => setShowTaskInput(!showTaskInput)}
                >
                <Image src={"assets/images/plus.svg"} width={20} height={20} alt="#" />
                <span>Add Task</span>
                </p>
            </div>

            {showTaskInput && (
                <div className="border-2 border-red-300 w-full rounded-xl">
                    <input
                        type="text"
                        className="border-none outline-none text-xl mt-2 w-full p-1 px-2 text-black"
                        placeholder="Add Todo"
                        value={value}
                        onChange={handleOnChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                clickOnSubmit();
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className="border-2 border-red-300 hover:border-red-600 rounded-xl text-xl py-1 px-3 m-2"
                        onClick={clickOnSubmit}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="border-2 border-red-300 hover:border-red-600 rounded-xl text-xl py-1 px-3 m-2"
                        onClick={() => setShowTaskInput(false)}
                    >
                        Cancel
                    </button>
                    {inError && <p className="text-red-500">Please enter data</p>}
                </div>
            )}


        </div>
    );
}
