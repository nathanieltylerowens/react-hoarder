import React from 'react';
import _ from 'underscore';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import authData from '../../../helpers/data/authData';

import itemsData from '../../../helpers/data/itemsData';

class NewStuff extends React.Component {
  state = {
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ itemName: e.target.value });
  };

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ itemImage: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ itemDescription: e.target.value });
  }

  saveItemEvent = (e) => {
    e.preventDefault();

    const keysIWant = [
      'itemName',
      'itemImage',
      'itemDescription',
    ];

    const newItem = _.pick(this.state, keysIWant);
    newItem.uid = authData.getUid();

    itemsData.createItem(newItem)
      .then((res) => {
        this.props.history.push(`/stuff/${res.data.name}`);
      })
      .catch((err) => console.error('new item done broke', err));
  };

  render() {
    const {
      itemName,
      itemImage,
      itemDescription,
    } = this.state;

    return (
      <div className="NewStuff">
        <h1>NewStuff</h1>
        <Form>
          <FormGroup>
            <Label htmlFor="itemName">Name</Label>
            <Input
            type="text"
            name="form-control"
            id="itemName"
            placeholder="Pogs"
            value={itemName}
            onChange={this.changeNameEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="itemImage">Photo</Label>
            <Input
            type="text"
            name="form-control"
            id="itemImage"
            placeholder="https://awesomestufftobuy.com/wp-content/uploads/2017/02/pogs-and-slammers-scaled.jpg"
            value={itemImage}
            onChange={this.changeImageEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="itemDescription">Text Area</Label>
            <Input
            type="textarea"
            name="form-control"
            id="itemDescription"
            value={itemDescription}
            onChange={this.changeDescriptionEvent} />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.saveItemEvent}>Save Item</Button>
        </Form>
      </div>
    );
  }
}

export default NewStuff;
