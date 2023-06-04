import React from 'react'

function TaskListItem({ item }) {
    return (
        <div className="border-b p-2 relative">
            <div className="text-lg line-clamp-1 text-ellipsis hover:line-clamp-none whitespace-pre-wrap">
                {item.content}
            </div>
            <div className="text-sm line-clamp-1 text-ellipsis select-none">
                <span className="text-rose-700/80 border bg-red-700 text-white rounded-sm px-0.5 mr-1">
                    <span>限时</span>
                    {item.deadline}
                </span>
                {item.tags.map((tag) => (
                    <span
                        className="text-gray-400 border rounded-sm px-0.5 mr-1"
                        key={tag.id}
                    >
                        {tag.name}/{tag.group.name}
                    </span>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-32 flex flex-row items-center text-sm justify-between">
                <button type="link" className="text-blue-600">
                    跟进
                </button>
                <button type="link" className="text-blue-600">
                    删除
                </button>
                <button type="link" className="text-blue-600">
                    知识
                </button>
                <button type="link" className="text-blue-600">
                    想法
                </button>
            </div>
        </div>
    )
}

export default function TaskList({ list }) {
    return (
        <div className="overflow-auto">
            {list.map((it) => (
                <TaskListItem item={it} key={it.id} />
            ))}
        </div>
    )
}
