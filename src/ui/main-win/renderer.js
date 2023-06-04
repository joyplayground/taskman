/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import './index.css'
import React from 'react'

import { createRoot } from 'react-dom/client'
import SideMenu from './component/side-menu'
import TaskList from './component/task-list'

const domNode = document.getElementById('app')
const root = createRoot(domNode)

const menus = [
    { key: 'inbox', label: '收件箱' },
    { key: 'follow', label: '跟进' },
    { key: 'calendar', label: '日程' },
    { key: 'archive', label: '归档' },
    { key: 'tag', label: '标签' },
]

const taskList = [
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检\n\n记得带上证件',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
    {
        id: 1,
        content: '预约3月体检',
        deadline: '2023-06-10',
        tags: [
            { id: 1, name: '重要', group: { id: 1, name: '家庭' } },
            { id: 2, name: '孩子', group: { id: 1, name: '家庭' } },
            { id: 3, name: '限时完成', group: { id: 2, name: '时效性' } },
        ],
    },
]

root.render(
    <>
        <div className="app-menu">
            <SideMenu menus={menus} />
        </div>
        <div className="grow flex flex-col content-start mx-2 py-2">
            <h3 className="text-xl mx-4">收件箱</h3>
            <TaskList list={taskList} />
            <div className="flex flex-row items-center py-4">
                <div
                    contentEditable
                    className="grow leading-normal overflow-auto border border-gray-400 rounded-md p-2"
                />
                <button className="text-center block h-8 ml-2 text-blue-800 font-medium">
                    记录事项
                </button>
            </div>
        </div>
    </>
)
