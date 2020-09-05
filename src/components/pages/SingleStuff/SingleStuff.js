import React from 'react';

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

class SingleStuff extends React.Component {
  state = {
    item: {},
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;

    itemsData.getItemById(itemId)
      .then((res) => this.setState({ item: res.data }))
      .catch((err) => console.error('get single item broke', err));
  }

  render() {
    const { item } = this.state;

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
                </ButtonGroup>
              </CardBody>
          </Card>
        </CardGroup>
        </Col>
      </div>
    );
  }
}

export default SingleStuff;
