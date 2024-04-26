"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

interface List {
    id: number;
    task: string;
    isImportant: boolean;
    isCheck: boolean
}
export default function Important() {
    const [list, setList] = useState<List[]>([] as List[]);
    useEffect(() => {
        const todolist = localStorage.getItem("todo");
        if (todolist) {
            setList(JSON.parse(todolist));
            // const importantLi = list.filter((item) => item.isImportant === true)
            // setImportantList(importantLi);
            // localStorage.setItem("todo", JSON.stringify(importantLi));

        }
    }, []);
    const clickOnDelete = (id: number) => {
        const updatedList = list.filter((value) => value.id !== id);
        setList(updatedList);
        localStorage.setItem("todo", JSON.stringify(updatedList));
    };

    return (
        <>
            <p>important</p>
            <ul className="pt-2">
                {/* {<button
                    type="button"
                    onClick={() => handleDeleteSelected()}

                    className={`${selectedItems.length === 0 ? "hidden " : "block border-2 border-red-300 hover:border-red-600 rounded-xl text-xl py-1 px-3"}`}
                >
                    Select Delete
                </button>} */}

                {list.length ? (
                    list?.map((item) => {
                        return (
                            <div key={item.id}>
                                <li className="border-b border-red-300 flex items-center justify-between py-4">
                                    <div className="flex items-center">


                                        <label className="ml-2">
                                            {/* <input
                                                type="checkbox"
                                                className="bg-slate-600"
                                                onChange={(e) => handleCheckboxChange(e, item.id)}
                                            /> */}
                                            {/* <input type="checkbox" onChange={()=>hadleChackboxChange(item.id)}/> */}

                                        </label>

                                        <span className="p-2" >{item.task}</span>

                                    </div>
                                    <div className="flex">
                                        {item.isImportant ? (
                                            <Image
                                                src={"assets/images/importantfull.svg"}
                                                width={20}
                                                height={20}
                                                alt="#"
                                                className={`${item.isImportant && "block"}`}
                                            // onClick={(e) => clickonImportant(item.id)}
                                            />
                                        ) : (
                                            <Image
                                                src={"assets/images/important.svg"}
                                                width={20}
                                                height={20}
                                                alt="#"
                                            // onClick={(e) => clickonImportant(item.id)}
                                            />
                                        )}

                                        {/* {clickEditItemId != item.id && (
                                            <button
                                                type="submit"
                                                className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                                                onClick={() => clickOnEdit(item.id)}
                                            >
                                                Edit
                                            </button>
                                        )} */}

                                        {/* {clickEdit && clickEditItemId === item.id && (
                                            <button
                                                type="submit"
                                                className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                                                onClick={() => saveEditTask(item.id)}
                                            >
                                                save
                                            </button>
                                        )} */}
                                        <button
                                            type="submit"
                                            className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                                            onClick={() => clickOnDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col justify-center items-center p-6 h-100lvh">
                        <Image
                            src={"assets/images/peace-of-mind.svg"}
                            width={200}
                            height={200}
                            alt="#"
                        />
                        <p>Your peace of mind is priceless</p>
                    </div>
                )}
            </ul>
        </>
    )
}