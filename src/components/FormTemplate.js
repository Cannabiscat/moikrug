import React from 'react';
import { Form, FormGroup, FormControl, Button, Col, Panel } from 'react-bootstrap';

const formTemplate = ({ itemData, type, departments, onSubmitHandler }) => {
  const employeesTemplate = (data = { firstName: '', lastName: '', departmentId: 1 }) => (
    <Form horizontal onSubmit={onSubmitHandler} data-type='employee'>
      <FormGroup>
        <Col xs={2}>
          First Name
        </Col>
        <Col xs={10}>
          <FormControl type='text' name='firstName' id='firstName' defaultValue={data.firstName} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col xs={2}>
          Last Name
        </Col>
        <Col xs={10}>
          <FormControl type='text' name='lastName' id='lastName' defaultValue={data.lastName} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col xs={2}>
          Department
        </Col>
        <Col xs={10}>
          <FormControl componentClass='select' id='department' name='departmentId' defaultValue={data.departmentId}>
            {departments.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.toString.name}</option>
              );
            })}
          </FormControl>
        </Col>
      </FormGroup>
      <Button type='submit'>Submit</Button>
    </Form>
  );

  const departmentsTemplate = (data = { name: '' }) => (
    <Form horizontal onSubmit={onSubmitHandler} data-type='department'>
      <FormGroup>
        <Col xs={2}>
          Name
        </Col>
        <Col xs={10}>
          <FormControl type='text' name='name' id='name' defaultValue={data.name} />
        </Col>
      </FormGroup>
      <Button type='submit'>Submit</Button>
    </Form>
  );

  const result = () => {
    switch (type) {
      case 'Employees':
        return employeesTemplate(itemData);
      case 'Departments':
        return departmentsTemplate(itemData);
      default:
        return '';
    }
  };
  const header = (itemData.id) ? 'Edit' : 'Create';
  return (
    <Panel header={header}>
      {result()}
    </Panel>
  );
};

formTemplate.propTypes = {
  itemData: React.PropTypes.object,
  type: React.PropTypes.string,
  departments: React.PropTypes.array,
  onSubmitHandler: React.PropTypes.func,
};

export default formTemplate;
