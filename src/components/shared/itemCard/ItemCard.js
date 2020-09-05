import React from 'react';

import {
  Link as RRLink,
} from 'react-router-dom';

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

    const singleItemLink = `/stuff/${item.id}`;

    return (
      <div>
      <Card>
        <CardImg top width="100%" src={item.itemImage} alt="Card image cap" />
        <CardBody>
        <CardTitle>{item.itemName}</CardTitle>
          <CardText>{item.itemDescription}</CardText>
          <ButtonGroup>
            <Button><i className="fas fa-edit"></i></Button>
            <Button tag={RRLink} to={singleItemLink}><i className="fas fa-eye"></i></Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default ItemCard;
