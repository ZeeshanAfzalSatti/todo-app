import React, {memo, Fragment} from 'react'
import styled from 'styled-components'
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import CustomInput from "./CustomInput";
import TodoList from './TodoList';

const _renderTodoListName = (name) => {
    return <Tab key={name}>{name}</Tab>
}

const _renderNewTodoList = (toggleComplete) => {
    return <Tab key='new-list'>New List</Tab>
}

const _renderTodoList = (list, todos, key) => {
    const {toggleComplete} = todos

    return <TabPanel key={key}>
        <CustomInput
            onSave={todos.createTodo(key)}
            placeholder='Add New Todo in list...'/>
        <TodoList listName={key} items={list} toggleComplete={toggleComplete}/>
    </TabPanel>
}

const _renderSelectSection = (optionsState, changeFilter) => {
    return <Select value={optionsState} onChange={changeFilter}>
        <option value="all">All</option>
        <option value="complete">Completed</option>
        <option value="active">Active</option>
    </Select>
}

const TodoTabsList = memo(({todos, list, filter}) => {
    const tabsName = Object.keys(list)

    return <Fragment>
        {Boolean(tabsName.length) && _renderSelectSection(filter, todos.changeFilter)}
        <Tabs>
            <TabList>
                {tabsName.map(_renderTodoListName)}
                {_renderNewTodoList()}
            </TabList>

            {tabsName.map(key => _renderTodoList(list[key], todos, key))}

            <TabPanel>
                <CustomInput
                    onSave={todos.createTodoList}
                    placeholder='Add New Todo List...'/>
            </TabPanel>
        </Tabs>
    </Fragment>
})


const Select= styled.select`
margin-bottom: 1em;`


export default TodoTabsList
