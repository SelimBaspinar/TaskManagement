

import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref'

import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { getTask } from '../redux/actions/taskActions'
import { editTaskOrder } from '../redux/actions/taskActions'
import { editReminder } from '../redux/actions/reminderActions'

import { getReminder } from '../redux/actions/reminderActions'
import { getUsers } from '../redux/actions/userActions'

import { getTaskSuccess } from '../redux/actions/taskActions'

import { getActiveUser } from '../redux/actions/userActions'
import { loginStat } from '../redux/actions/loginActions'
import Register from './Register';
import Login from './Login'
import { getLoginModal } from '../redux/actions/loginModalActions'
import { getRegisterModal } from '../redux/actions/registerModalActions'
import { getRoles } from '../redux/actions/roleAction'

import { DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, } from 'reactstrap';

import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import { useTranslation } from "react-i18next";
import logo from "../img/logo.jpg";
import axios from "axios";

function Navi({ getTask, tasks, activetask,getTaskSuccess, getUsers, getReminder, users, reminders, editReminder, editTaskOrder
    , loginstat, loginStat, activeuser, getActiveUser, getLoginModal, loginmodal, getRegisterModal, registermodal,
    getRoles, roles, ...props }) {
    const [modal, setModal] = useState(false);
    const mounted = useRef();
    const { t, i18n } = useTranslation("TaskManagement");
    let history = useNavigate();
    const isDashboard = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            getUsers();
            getTask();
            getActiveUser(JSON.parse(localStorage.getItem("activeuser")));
            loginStat(localStorage.getItem("loginstat"))
            getRoles();
            getReminder();
            mounted.current = true;
        }
    }, [getUsers, getTask, getReminder])
    const handleLogin = () => {
        toggle();
    };

    const toggle = () => {
        getLoginModal(!loginmodal);
    };

    const togglelogin = () => {
        getLoginModal(!loginmodal)
    };

    const toggleregister = () => {
        getRegisterModal(!registermodal)
    };
    const toggle1 = () => {
        setModal(!modal);
    };

    const loginstatus = () => {
        if (loginstat !== localStorage.getItem("loginstat")) { loginStat(localStorage.getItem("loginstat")) }
        if (activeuser !== JSON.parse(localStorage.getItem("activeuser"))) { getActiveUser(JSON.parse(localStorage.getItem("activeuser"))) }
    }

    const loginclick = () => {
        if (loginstat == false || loginstat == null) {
            history("/Login")
        }
    }

    const dropdownclick = () => {
        if (loginstat == false || loginstat == null) {
            history("/Login")
        }
    }

    const singout = () => {
        localStorage.removeItem("activeuser")
        localStorage.removeItem("loginstat")
        loginStat("false");
        history("/");
        loginstatus();
        if (loginmodal == true) {
            getLoginModal(!loginmodal);
        }
        getActiveUser("");
    }




 

    const navlogin = () => {
        if (loginstat == false || loginstat == null) {
            return (
                <div className="nav_login d-block mr-0 ml-auto">
                    <i className="fas fa-sign-in-alt" onClick={handleLogin}></i>
                </div>
            )
        } else {
            return (
                <div className="nav_login d-block mr-0 ml-auto">
                    <UncontrolledDropdown>
                        <DropdownToggle nav>
                            <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
                                <img src={activeuser.img} alt="" />
                            </button>
                        </DropdownToggle>
                        <DropdownMenu>
                            <h6 className="dropdown-header">{activeuser.Name}</h6>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => history("/Profile")}>  {t("0.txt.login.profile")}</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={singout}>{t("0.txt.login.sign_out")}</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
    const navlang = () => {
        return (
            <div className="nav_lang ">
                <UncontrolledDropdown>
                    <DropdownToggle nav>
                        <i className="bi bi-translate"></i>

                    </DropdownToggle>
                    <DropdownMenu>

                        <DropdownItem onClick={() => i18n.changeLanguage('en')}>{t("0.txt.lang.en")}</DropdownItem>
                        <DropdownItem onClick={() => i18n.changeLanguage('tr')}>{t("0.txt.lang.tr")}</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }

   
      
    
async function search(){
    const txt = document.getElementById("search").value
    axios.get("/api/tasks/").then((res) =>getTaskSuccess(res.data.filter(task=>task.Name.toString().includes(txt)||task.Description.toString().includes(txt)||task.Label.toString().includes(txt)))
    );
   
  

}


    return (
        <div>
            <Container fluid>
                <Row>
                    <div className="flex flex-col w-screen ">
                    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75 navi">
                            <button onClick={()=>history("/")}><img className="w-20 h-10 text-indigo-600 stroke-current" src={logo}  ></img></button>
                            
                            <input onChange={()=>search()}  id="search" className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring" type="search" placeholder="Search for anything…" />
                           
                            {navlogin()}
                            {navlang()}

                        </div>
                    </div>


                </Row>
            </Container>
            {loginmodal ? (
                <Login toggle={togglelogin} />
            ) : null}
            {registermodal ? (
                <Register toggle={toggleregister} />
            ) : null}
            {modal ? (
                <Modal isOpen={true} toggle={toggle} scrollable>
                    <ModalHeader className="modal-header text-center" toggle={toggle} tag="h2">  {t("0.txt.ModalInfoHeader")}</ModalHeader>
                    <ModalBody>
                        <h4>{t("0.txt.ModalInfoBody")}</h4>
                    </ModalBody>
                </Modal>
            ) : null}
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        tasks: state.taskReducers,
        activetask: state.activeTaskReducers,
        users: state.userReducers,
        reminders: state.reminderReducers,
        activeuser: state.activeUserReducers,
        loginstat: state.loginReducers,
        loginmodal: state.loginModalReducers,
        registermodal: state.registerModalReducers,
        roles: state.roleReducers,
    }
}
const mapDispatchToProps = {
    getTask, getUsers, getReminder, editReminder, editTaskOrder, getActiveUser, loginStat, getLoginModal, getRegisterModal, getRoles,getTaskSuccess

}

export default connect(mapStateToProps, mapDispatchToProps)(Navi)


