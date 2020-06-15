import React from 'react';
import Card from '../common/Card.jsx';
import ShoppingListItem from './ShoppingListItem.jsx';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import { getShoppingListData, addShoppingListData } from '../../api/shoppingList.js';
import Scrollbox from '../common/Scrollbox.jsx';
import './ShoppingList.css';

class ShoppingList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: "",
            items: []
        }
    }

    componentDidMount() {
        getShoppingListData()
            .then(data => {
                let items = data.map(item => {
                    return { value: item.product_name, checked: false }
                });
                this.setState({ items });
            });
    }

    handleAddButtonClick() {
        if (this.state.input) {
            addShoppingListData(this.state.input)
                .then(data => {
                    this.setState(state => {
                        let items = [
                            ...state.items,
                            {
                                value: state.input,
                                checked: false
                            }
                        ];
                        return { input: "", items };
                    });
                });
        }
    }

    handleInputChange(event) {
        let input = event.target.value;
        this.setState({ input });
    }

    handleInputKeyDown(event) {
        if (event.key === "Enter") {
            this.handleAddButtonClick();
        }
    }

    handleItemCheckedOff(index) {
        this.setState(state => {
            state.items[index].checked = true;
            return state;
        });
    }

    render() {
        return (
            <Card
                className={'shopping-list'}
                style={this.props.style}
            >
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'column',
                        height: '100%'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flex: '0 1 50px',
                            padding: '0px 15px'
                        }}
                    >
                        <Button
                            className={'shopping-list-add-button'}
                            style={{
                                width: 50,
                                height: 50
                            }}
                            onClick={() => this.handleAddButtonClick()}
                        >
                        </Button>
                        <Input
                            className={'shopping-list-input'}
                            style={{
                                height: 47,
                                width: 420,
                                margin: '0px 15px'
                            }}
                            value={this.state.input}
                            placeholder={'Add item'}
                            onChange={event => this.handleInputChange(event)}
                            onKeyDown={event => this.handleInputKeyDown(event)}
                        />
                    </div>
                    <Scrollbox
                        style={{
                            flex: '1 1 auto',
                            marginTop: 15,
                            overflow: 'hidden auto'
                        }}
                        suppressInsetShadows
                    >
                        <div style={{ padding: '0px 10px' }}>
                            {this.state.items.map((item, index) => <ShoppingListItem key={index} value={item.value} checked={item.checked} onCheckClick={() => this.handleItemCheckedOff(index)} />)}
                        </div>
                    </Scrollbox>
                </div>
            </Card>
        );
    }
}

export default ShoppingList;