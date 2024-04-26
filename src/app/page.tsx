"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AddTodo from "./component/add-todo/AddTodo";

interface List {
  id: number;
  task: string;
  isImportant: boolean;
  isCheck: boolean
}

export default function Inbox() {
  const [list, setList] = useState<List[]>([] as List[]);
  const [inError, setInError] = useState(false);
  const [clickEdit, setClickEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [clickEditItemId, setClickEditItemId] = useState<number | null>(null);
  const [clickImportantId, setClickImportantId] = useState<number | null>(null);
  const [important, setImportant] = useState(false);
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [impList, setImpList] = useState<List[]>([] as List[]);


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const todolist = localStorage.getItem("todo");
    if (todolist) {
      setList(JSON.parse(todolist));
    }
  }, []);

  useEffect(() => {
    const imp = list.filter((item) => item.isImportant)
    localStorage.setItem("imp", JSON.stringify(imp));
    setImpList(imp)
  }, [list])
  
  // handle Edit event
  const handleOnEditChange = (e: any) => {
    setEditValue(e.target.value);
    setInError(false);
  };



  // handle delete button
  const clickOnDelete = (id: number) => {
    const updatedList = list.filter((value) => value.id !== id);
    setList(updatedList);
    localStorage.setItem("todo", JSON.stringify(updatedList));
  };

  const onClickFocus = () => {
    console.log('Focus input');
    inputRef.current?.autofocus;
  }
  // click edit event
  const clickOnEdit = (id: number) => {
    onClickFocus()
    setClickEditItemId(id);
    setEditValue(list.find((item) => item.id === id)?.task || "");
    setClickEdit(true);
  };


  // save edit task and update local storage
  const saveEditTask = (id: number) => {
    if (!editValue) {
      setInError(true);
      return;
    }
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, task: editValue } : item
    );
    setList(updatedList);
    setClickEditItemId(null);
    setClickEdit(false);
    localStorage.setItem("todo", JSON.stringify(updatedList));
  };

  const clickonImportant = (id: number) => {
    setClickImportantId(id);
    const importantList = list.map((item) =>
      item.id === id ? { ...item, isImportant: !important } : item
    );
    setList(importantList);
    setClickEditItemId(null);
    setImportant(!important);

    localStorage.setItem("todo", JSON.stringify(importantList));
  };

  const handleDeleteSelected = () => {
    const updatedList = list.filter((item) => !selectedItems.includes(item.id));
    setList(updatedList);
    setSelectedItems([]);
    localStorage.setItem("todo", JSON.stringify(updatedList));
  };
  const handleCheckboxChange = (e: any, itemId: number) => {
    const isChecked = e.target.checked;
    setSelectedItems((selectedItems) =>
      isChecked ? [...selectedItems, itemId] : selectedItems.filter((id) => id !== itemId)
    );
  }



  return (
    <>
      <div>
        <p className="text-3xl font-bold">Index</p>
        <div>




          <AddTodo setList={setList} list={list} />




          <ul className="pt-2">
            {<button
              type="button"
              onClick={() => handleDeleteSelected()}

              className={`${selectedItems.length === 0 ? "hidden " : "block border-2 border-red-300 hover:border-red-600 rounded-xl text-xl py-1 px-3"}`}
            >
              Select Delete
            </button>}


            {impList.length > 0 ? <span>Important</span> : null}
            


            {impList?.map((item) => {
              return (
                <div key={item.id} className="mb-2">
                  <li className="border-b border-red-300 flex items-center justify-between py-4">
                    <div className="flex items-center">


                      <label className="ml-2">
                        <input
                          type="checkbox"
                          className="bg-slate-600"
                          onChange={(e) => handleCheckboxChange(e, item.id)}
                        />
                      </label>

                      {clickEditItemId === item.id ? (
                        <div onDoubleClick={(e) => saveEditTask(item.id)}>
                          <input
                            ref={inputRef}
                            className={`${clickEdit
                              ? "border-2 border-red-400 rounded-md p-2 w-full"
                              : "outline-none"
                              }`}
                            value={editValue}
                            onChange={handleOnEditChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveEditTask(item.id);
                              }
                            }}
                            autoFocus
                          />
                          {inError && (
                            <p className="text-red-500">Please enter data</p>
                          )}
                        </div>
                      ) : (
                        <span className="p-2" onDoubleClick={() => clickOnEdit(item.id)}>{item.task}</span>
                      )}
                    </div>
                    <div className="flex">
                      {item.isImportant ? (
                        <button>
                          <Image
                            src={"assets/images/importantfull.svg"}
                            width={20}
                            height={20}
                            alt="#"
                            onClick={(e) => clickonImportant(item.id)}
                          />
                        </button>
                      ) : (
                        <button>
                          <Image
                            src={"assets/images/important.svg"}
                            width={20}
                            height={20}
                            alt="#"
                            onClick={(e) => clickonImportant(item.id)}
                          />
                        </button>
                      )}

                      {clickEditItemId != item.id && (
                        <button
                          type="submit"
                          className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                          onClick={() => clickOnEdit(item.id)}
                        >
                          Edit
                        </button>
                      )}

                      {clickEdit && clickEditItemId === item.id && (
                        <button
                          type="submit"
                          className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                          onClick={() => saveEditTask(item.id)}
                        >
                          save
                        </button>
                      )}
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
              )
            })}

            {clickImportantId ?  <p className="mt-3">Task</p> : null}

            {list.length ? (
              list?.map((item) => {
                return (
                  <div key={item.id}>
                    {!item.isImportant ?
                      <li className="border-b border-red-300 flex items-center justify-between py-4">
                        <div className="flex items-center">


                          <label className="ml-2">
                            <input
                              type="checkbox"
                              className="bg-slate-600"
                              onChange={(e) => handleCheckboxChange(e, item.id)}
                            />
                          </label>
                          {clickEditItemId === item.id ? (
                            <div onDoubleClick={(e) => saveEditTask(item.id)}>
                              <input
                                ref={inputRef}
                                className={`${clickEdit
                                  ? "border-2 border-red-400 rounded-md p-2 w-full"
                                  : "outline-none"
                                  }`}
                                value={editValue}
                                onChange={handleOnEditChange}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    saveEditTask(item.id);
                                  }
                                }}
                                autoFocus
                              />
                              {inError && (
                                <p className="text-red-500">Please enter data</p>
                              )}
                            </div>
                          ) : (
                            <span className="p-2" onDoubleClick={() => clickOnEdit(item.id)}>{item.task}</span>
                          )}
                        </div>
                        <div className="flex">
                          {item.isImportant ? (
                            <button>
                              <Image
                                src={"assets/images/importantfull.svg"}
                                width={20}
                                height={20}
                                alt="#"
                                onClick={(e) => clickonImportant(item.id)}
                              />
                            </button>
                          ) : (
                            <button>
                              <Image
                                src={"assets/images/important.svg"}
                                width={20}
                                height={20}
                                alt="#"
                                onClick={(e) => clickonImportant(item.id)}
                              />
                            </button>
                          )}

                          {clickEditItemId != item.id && (
                            <button
                              type="submit"
                              className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                              onClick={() => clickOnEdit(item.id)}
                            >
                              Edit
                            </button>
                          )}

                          {clickEdit && clickEditItemId === item.id && (
                            <button
                              type="submit"
                              className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                              onClick={() => saveEditTask(item.id)}
                            >
                              save
                            </button>
                          )}
                          <button
                            type="submit"
                            className="border-2 rounded-xl text-xl px-2 ml-2 hover:text-red-500 hover:border-red-400"
                            onClick={() => clickOnDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                      : null}
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
        </div >
      </div >
    </>
  );
}
