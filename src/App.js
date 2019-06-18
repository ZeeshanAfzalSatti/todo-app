import React from 'react'
import {Provider, Subscribe} from 'unstated'
import styled from 'styled-components'

import TodosContainer from './store'
import TodoTabs from "./components/TodoTabs";

function App() {
    return (
        <Provider>
            <Wrapper>
                <Subscribe to={[TodosContainer]}>
                    {todos => {
                        const list = todos.getList()
                        const filter = todos.getFilter()

                        return (
                            <TodosWrapper>
                                <TodoTabs todos={todos} filter={filter} list={list}/>
                            </TodosWrapper>
                        )
                    }}
                </Subscribe>
            </Wrapper>
        </Provider>
    )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
