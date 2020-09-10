import React, { useState, useEffect } from 'react';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card,
  CardBody,
  CardGroup,
  CardText,
  CardImg,
  ButtonGroup,
  Button,
  Col,
} from 'reactstrap';

import itemsData from '../../../helpers/data/itemsData';

const SingleStuff = (props) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    const { itemId } = props.match.params;

    itemsData.getItemById(itemId)
      .then((res) => setItem(res.data))
      .catch((err) => console.error('get single item broke', err));
  }, [props.match.params]);

  const deleteItem = () => {
    const { itemId } = props.match.params;
    itemsData.deleteItem(itemId)
      .then(() => props.history.push('/stuff'))
      .catch((err) => console.error('delete single item failed!', err));
  };

  return (
      <div className="SingleItem">
        <h1>{item.itemName}</h1>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <CardGroup>
          <Card>
            <CardImg top width="40%" src={item.itemImage} alt="Card image cap" />
              <CardBody>
                  <CardText>{item.itemDescription}</CardText>
                <ButtonGroup>
                  <Button tag={RRLink} to="/stuff">Return</Button>
                  <Button onClick={deleteItem}><i className="fas fa-trash"></i></Button>
                </ButtonGroup>
              </CardBody>
          </Card>
        </CardGroup>
        </Col>
      </div>
  );
};

export default SingleStuff;
