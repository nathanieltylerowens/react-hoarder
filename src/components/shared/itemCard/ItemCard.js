import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, ButtonGroup,
} from 'reactstrap';

import itemShape from '../../../helpers/props/itemShape';

class ItemCard extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
  }

  render() {
    const { item } = this.props;

    return (
      <div>
      <Card>
        <CardImg top width="100%" src={item.itemImage} alt="Card image cap" />
        <CardBody>
        <CardTitle>{item.itemName}</CardTitle>
          <CardText>{item.itemDescription}</CardText>
          <ButtonGroup>
            <Button>Edit</Button>
            <Button>View</Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default ItemCard;
