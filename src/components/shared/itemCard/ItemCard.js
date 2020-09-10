import React from 'react';
import PropTypes from 'prop-types';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, ButtonGroup,
} from 'reactstrap';

import itemShape from '../../../helpers/props/itemShape';

const ItemCard = (props) => {
  const { item, deleteItem } = props;

  const singleItemLink = `/stuff/${item.id}`;
  const editLink = `/edit/${item.id}`;

  return (
      <div>
      <Card>
        <CardImg top width="100%" src={item.itemImage} alt="Card image cap" />
        <CardBody>
        <CardTitle>{item.itemName}</CardTitle>
          <CardText>{item.itemDescription}</CardText>
          <ButtonGroup>
            <Button tag={RRLink} to={editLink}><i className="fas fa-edit"></i></Button>
            <Button tag={RRLink} to={singleItemLink}><i className="fas fa-eye"></i></Button>
            <Button onClick={() => { deleteItem(item.id); }}><i className="fas fa-dumpster"></i></Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </div>
  );
};

ItemCard.propTypes = {
  item: itemShape.itemShape,
  deleteItem: PropTypes.func.isRequired,
};

export default ItemCard;
