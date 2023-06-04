import React from 'react'

function SideMenuItem({ menu }) {
    return (
        <div className="grow-0 h-10 px-4 cursor-pointer flex flex-row items-center hover:bg-slate-500 hover:text-yellow-50">
            {menu.label}
        </div>
    )
}

export default function SideMenu({ menus }) {
    return (
        <div className="flex flex-col">
            {menus.map((m) => (
                <SideMenuItem key={m.key} menu={m} />
            ))}
        </div>
    )
}
