import React, {memo} from 'react'
import styled from 'styled-components'

import TodoItem from './TodoItem'

const _renderTodoItem = (toggleComplete, listName) => (item) => {
    const {id} = item
    return <TodoItem key={id} {...item} onComplete={toggleComplete.bind(this, id, listName)}/>
}

const TodoList = memo(({items, toggleComplete, listName}) => (
    <Wrapper>
        {items.map(_renderTodoItem(toggleComplete, listName))}
    </Wrapper>
))

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
