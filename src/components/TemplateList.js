import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import TemplateItem from './TemplateItem';

const templateList = ({ current, name, items, onClickHandler, onDeleteHandler }) => {
  const list = items.map((item) => {
    return (
      <TemplateItem
        current={current}
        item={item.toString}
        key={item.id}
        id={item.id}
        section={name}
        onClickHandler={onClickHandler}
        onDeleteHandler={onDeleteHandler}
      />
    );
  });
  return (
    <ListGroup>
      <ListGroupItem className='list header'>
        <span>
          {name}
        </span>
        <Button bsSize='xsmall' onClick={onClickHandler} data-section={name}>Create new</Button>
      </ListGroupItem>
      {list}
    </ListGroup>
  );
};
templateList.propTypes = {
  current: React.PropTypes.object,
  name: React.PropTypes.string,
  items: React.PropTypes.array,
  onClickHandler: React.PropTypes.func,
  onDeleteHandler: React.PropTypes.func,
};
export default templateList;