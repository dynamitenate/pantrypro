import React from 'react';
import Card from '../common/Card.jsx';
import ShoppingListItem from './ShoppingListItem.jsx';

class ShoppingList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [
                'one',
                'two',
                'three'
            ]
        }
    }
    render() {
        return (
            <Card
                className={'shopping-list-default'}
                style={this.props.style}
            >
                {"ShoppingList"}
                {this.state.items.map(item => <ShoppingListItem value={item}/>)}
            </Card>
        );
    }
}

export default ShoppingList;