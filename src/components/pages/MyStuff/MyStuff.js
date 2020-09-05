import React from 'react';

import { CardColumns } from 'reactstrap';

import authData from '../../../helpers/data/authData';
import itemsData from '../../../helpers/data/itemsData';
import ItemCard from '../../shared/itemCard/ItemCard';

class MyStuff extends React.Component {
  state ={
    items: [],
  }

  componentDidMount() {
    itemsData.getItemsByUid(authData.getUid())
      .then((items) => this.setState({ items }))
      .catch((err) => console.error('get items broke', err));
  }

  render() {
    const { items } = this.state;

    const itemCards = items.map((item) => <ItemCard key={item.id} item={item}/>);
    return (
      <div className="MyStuff">
        <h1>MyStuff</h1>
        <CardColumns>
          {itemCards}
        </CardColumns>
      </div>
    );
  }
}

export default MyStuff;
