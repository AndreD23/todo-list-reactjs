"use client"

import {useState} from "react";
import {TodoItem} from "../types/TodoItem";

const Page = () => {

    const [itemInput, setItemInput] = useState<string>("")

    const [list, setList] = useState<TodoItem[]>([])

    // Para adicionar, remover ou alterar um item na lista, precisa criar um novo array

    const handleAddBtn = () => {
        // Limpando para não criar um item vazio
        if (itemInput.trim() === "") return

        setList([
            ...list, // Copia todos os itens do array
            {// Adiciona um novo item no array
                id: Date.now(), // Gera um id único
                label: itemInput,
                done: false
            }
        ])

        // Limpar o input
        setItemInput("")
    }

    const handleRemoveBtn = (id: number) => {
        setList(list.filter(item => item.id !== id)) // Retorna todos os itens que não tem o id passado
    }

    // Toggle item done
    const handleToggleItem = (index: number) => {
        let newList = [...list] // Copia todos os itens do array
        newList[index].done = !newList[index].done // Altera o done do item clicado
        setList(newList) // Atualiza a lista
    }

    let i = 0

    return (
        <div className="w-screen h-screen flex flex-col items-center text-2xl">
            <h1 className={"text-4xl mt-5"}>Lista de Tarefas</h1>

            <div className={"flex w-full max-w-lg my-3 p-4 rounded-md bg-gray-700 border-2 border-gray-500"}>

                <input
                    type={"text"}
                    placeholder={"Digite uma tarefa"}
                    className={"flex-1 border border-black p-3 text-2xl text-black rounded-md mr-3"}
                    value={itemInput}
                    onChange={e => setItemInput(e.target.value)}
                />

                <button className={"mt-2 px-3 py-1 bg-green-500 rounded text-sm"} onClick={handleAddBtn}>Adicionar</button>
            </div>

            <p className={"my-5 text-sm"}>{list.length} itens na lista</p>

            <ul className={"w-full max-w-lg list-disc pl-5"}>
                {
                    // Para cada item da lista, renderiza um <li>
                    list.map((item, index) => {
                        i++

                        return (
                            <li className={"my-5"} key={index}>
                                <input type={"checkbox"} className={"mr-3 w-5 h-5"} checked={item.done} onChange={() => handleToggleItem(index)}/>
                                #{i}: {item.label} - <button className={"px-3 py-1 bg-red-400 rounded text-sm"} onClick={ () => handleRemoveBtn(item.id) }>x</button>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    );
}

export default Page;