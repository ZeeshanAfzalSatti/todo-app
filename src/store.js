import {Container} from 'unstated'

const defaultState = {
    list: {
        'Pending Tasks': [{
            id: 1,
            completed: false,
            text: 'Read README'
        }, {
            id: 2,
            completed: false,
            text: 'Add one todo'
        }, {
            id: 3,
            completed: false,
            text: 'Add filters'
        }, {
            id: 4,
            completed: false,
            text: 'Add multiple lists'
        }, {
            id: 5,
            completed: false,
            text: 'Optional: add tests'
        }],
    },
    filter: 'all'
}

class TodosContainer extends Container {
    constructor(props) {
        super(props)

        this.state = this.readStorage()
    }

    readStorage() {
        if (window && window.localStorage) {
            const state = window.localStorage.getItem('appState')
            if (state) {
                return JSON.parse(state)
            }
        }

        return defaultState
    }

    syncStorage = () => {
        if (window && window.localStorage) {
            const state = JSON.stringify(this.state)
            window.localStorage.setItem('appState', state)
        }
    }

    getList() {
        const {list = {}, filter = 'all'} = this.state

        if (filter === 'all') {
            return list || {}
        }

        const isCompleted = filter === 'complete'
        const filterList = {}

        for (const [key, value = []] of Object.entries(list)) {
            const data = value.filter(({completed}) => completed === isCompleted)
            filterList[key] = data
        }
        console.log(filterList)
        return filterList
    }

    getFilter() {
        const {filter = 'all'} = this.state
        return filter
    }

    changeFilter = ({target: {value: filter} = {}}) => {
        console.log(filter)
        this.setState({filter})
    }

    createTodoList = (key) => {
        const {list} = this.state
        this.setState({
            list: {...list, [key]: []}
        }, this.syncStorage)
    }

    toggleComplete = (id, key) => {
        const {list = {}} = this.state
        let todoCurrentList = list[key] || []
        todoCurrentList = todoCurrentList.map((item) => {
            const {id: itemId, completed} = item
            item.completed = itemId === id ? !completed : completed

            return item
        })

        this.setState({list: {...list, [key]: todoCurrentList}}, this.syncStorage)
    }

    createTodo = (key) => text => {
        let {list = {}} = this.state;
        const stateItem = list[key] || [];
        const item = {completed: false, text, id: stateItem.length + 1}

        this.setState({list: {...list, [key]: [...list[key], item]}})
    }
}

export default TodosContainer
