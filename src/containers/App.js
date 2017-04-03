import React, { PureComponent } from 'react';
import { Navbar, NavbarBrand, Col } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import TemplateList from '../components/TemplateList';
import FormTemplate from '../components/FormTemplate';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      employees: [],
      departments: [],
      currentItemId: null,
      currenItemData: {},
      currentSection: null,
      formData: null,
    };

    this.resetState = () => {
      this.setState({
        ...this.state,
        currentItemId: null,
        currenItemData: {},
        currentSection: null,
        formData: null,
      });
    };

    this.onClickHandle = (event) => {
      const [currentItemId, currentSection] = [
        event.target.dataset.id,
        event.target.dataset.section,
      ];
      if (currentItemId) {
        switch (currentSection) {
          case 'Employees':
            axios.get(`http://${document.domain}:3001/employee/${currentItemId}`)
              .then((res) => {
                this.resetState();
                return res;
              })
              .then((res) => {
                this.setState({
                  ...this.state,
                  currentItemId,
                  currentSection,
                  currentItemData: res.data,
                });
              });
            break;
          case 'Departments':
            axios.get(`http://${document.domain}:3001/department/${currentItemId}`)
              .then((res) => {
                this.resetState();
                return res;
              })
              .then((res) => {
                this.setState({
                  ...this.state,
                  currentItemId,
                  currentSection,
                  currentItemData: res.data,
                });
              });
            break;
          default:
            break;
        }
      } else {
        this.resetState();
        setTimeout(() => this.setState({
          ...this.state,
          currentItemId: null,
          currentItemData: {},
          currentSection,
        }), 0);
      }
    };

    this.onDeleteHandle = (event) => {
      const [section, id] = [event.target.dataset.section, event.target.dataset.id];
      switch (section) {
        case 'Employees':
          axios.delete(`http://${document.domain}:3001/employee/${id}`)
            .then(() => {
              this.resetState();
              this.getData();
            });
          break;
        case 'Departments':
          axios.delete(`http://${document.domain}:3001/department/${id}`)
            .then(() => {
              this.resetState();
              this.getData();
            });
          break;
        default:
          break;
      }
    };

    this.onSubmitHandle = (event) => {
      event.preventDefault();
      const formData = Array.from(event.target.elements)
          .filter(item => item.name)
          .reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});
      const url = `http://${document.domain}:3001/${event.target.dataset.type}`;
      if (!this.state.currentItemId) {
        axios.post(url, formData).then(() => {
          this.resetState();
          this.getData();
        });
      } else {
        axios.put(`${url}/${this.state.currentItemId}`, formData).then(() => {
          this.resetState();
          this.getData();
        });
      }
    };

    this.getData = () => {
      axios.get(`http://${document.domain}:3001/department`)
      .then((res) => {
        const departments = res.data.map((item) => {
          return {
            ...item,
            toString: { name: item.name, department: null },
          };
        });
        this.setState({ departments });
      })
      .then(() => {
        axios.get(`http://${document.domain}:3001/employee`)
          .then((res) => {
            const employees = res.data.map((item) => {
              const depName = (this.state.departments.filter((depItem) => {
                return depItem.id === Number(item.departmentId);
              })[0]) ?
                this.state.departments.filter((depItem) => {
                  return depItem.id === Number(item.departmentId);
                })[0].name
              : 'none';
              return {
                ...item,
                toString: { name: `${item.firstName} ${item.lastName}`, department: depName },
              };
            });
            this.setState({ employees });
          });
      });
    };
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    const form = () => {
      return (this.state.currentSection) ? (
        <FormTemplate
          itemData={this.state.currentItemData}
          type={this.state.currentSection}
          departments={this.state.departments}
          onSubmitHandler={this.onSubmitHandle}
        />
      ) : '';
    };
    return (
      <div className='App'>
        <Navbar>
          <NavbarBrand>Test</NavbarBrand>
        </Navbar>
        <Col className='main' md={12}>
          <Col className='sidebar' md={4}>
            <TemplateList
              current={{ section: this.state.currentSection, id: this.state.currentItemId }}
              name='Employees'
              items={this.state.employees}
              onClickHandler={this.onClickHandle}
              onDeleteHandler={this.onDeleteHandle}
            />
            <TemplateList
              current={{ section: this.state.currentSection, id: this.state.currentItemId }}
              name='Departments'
              items={this.state.departments}
              onClickHandler={this.onClickHandle}
              onDeleteHandler={this.onDeleteHandle}
            />
          </Col>
          <Col className='content' md={8}>
            {form()}
          </Col>
        </Col>
      </div>
    );
  }
}

export default App;
