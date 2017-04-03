import React from 'react';
import { Col, Button, ListGroupItem } from 'react-bootstrap';

const templateItem = ({ current, id, item, section, onClickHandler, onDeleteHandler }) => {
  const className = (current && Number(current.id) === Number(id) && current.section === section) ? 'list selected' : 'list item';
  return (
    <ListGroupItem className={className}>
      <Col xs={10} data-section={section} data-id={id} onClick={onClickHandler}>
        <span className='employee-name' data-section={section} data-id={id} onClick={onClickHandler}>{item.name}</span>
        <span className='employee-department' data-section={section} data-id={id} onClick={onClickHandler}>{item.department}</span>
      </Col>
      <Button bsSize='xsmall' data-section={section} data-id={id} onClick={onDeleteHandler}>
        Delete
      </Button>
    </ListGroupItem>
  );
};

templateItem.propTypes = {
  current: React.PropTypes.object,
  id: React.PropTypes.number,
  item: React.PropTypes.object,
  section: React.PropTypes.string,
  onClickHandler: React.PropTypes.func,
  onDeleteHandler: React.PropTypes.func,
};

export default templateItem;