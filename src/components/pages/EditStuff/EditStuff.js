import React from 'react';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import itemsData from '../../../helpers/data/itemsData';

class EditStuff extends React.Component {
  state ={
    item: {
      itemName: '',
      itemImage: '',
      itemDescription: '',
    },
  }

  componentDidMount() {
    itemsData.getItemById(this.props.match.params.itemId)
      .then((res) => {
        const item = res.data;
        item.seenAt = new Date(item.seenAt);
        this.setState({ item });
      })
      .catch((err) => console.error('err in get single birb', err));
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    item.itemName = e.target.value;
    this.setState({ item });
  };

  changeImageEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    item.itemImage = e.target.value;
    this.setState({ item });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    item.itemDescription = e.target.value;
    this.setState({ item });
  }

  updateItem = (e) => {
    e.preventDefault();
    const { itemId } = this.props.match.params;

    itemsData
      .updateItem(itemId, this.state.item)
      .then(() => {
        this.props.history.push(`/stuff/${itemId}`);
      })
      .catch((err) => console.error('edit item broke', err));
  }

  render() {
    const {
      itemName,
      itemImage,
      itemDescription,
    } = this.state.item;

    return (
      <div className="editStuff">
      <h1>Edit Stuff</h1>
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
        <Button className="btn btn-outline-warning" onClick={this.updateItem}><i className="fas fa-arrow-up"></i><i className="fas fa-calendar-day"></i></Button>
      </Form>
    </div>
    );
  }
}

export default EditStuff;
