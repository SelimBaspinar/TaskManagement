import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import TaskManagement from './components/TaskManagement';
import Profile from './components/Profile';
import Navi from './components/Navi';
import './css/App.css';

import useState from 'react-usestateref'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import AddTasks from './components/AddTasks';
import PopupAlert from './components/PopupAlert';
import { deleteTask, getTask } from './redux/actions/taskActions'
import { editTask, editTaskOrder, getTaskSuccess } from './redux/actions/taskActions'
import { editReminder, getActiveReminder } from './redux/actions/reminderActions'

import { getReminder } from './redux/actions/reminderActions'
import { getUsers } from './redux/actions/userActions'

import { getActiveTask } from './redux/actions/taskActions'

import { getActiveUser } from './redux/actions/userActions'
import { loginStat } from './redux/actions/loginActions'
import { getLoginModal } from './redux/actions/loginModalActions'
import { getRegisterModal } from './redux/actions/registerModalActions'
import { getRoles } from './redux/actions/roleAction'
import { getNotificationModal } from './redux/actions/notificationModalActions'

import { Label, Input, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function App({ getTask, getActiveTask, tasks, activetask, getTaskSuccess, getUsers, getReminder, users, reminders, editTask, editReminder, editTaskOrder
  , loginstat, loginStat, activeuser, getActiveUser, getLoginModal, loginmodal, getRegisterModal, registermodal,getNotificationModal,notificationModal,
  getRoles, roles, ...props }) {

  const notificationToggle = (e, stat) => {
    getNotificationModal(!notificationModal);
  }
  const [state, setState, stateref] = useState({
    Task: "",
    WhoSend: "",
    Date: "",
    room: localStorage.getItem("activeuser")!=null ?JSON.parse(localStorage.getItem("activeuser")).id : "",
  }
  );


  const [client, setClient, clientref] = useState(new W3CWebSocket('ws://localhost:8001/ws/chat/' + stateref.current.room + '/'));
  useEffect(() => {
    getUsers();
    getTask();
    getActiveUser(JSON.parse(localStorage.getItem("activeuser")));
    loginStat(localStorage.getItem("loginstat"))
    getRoles();
    getReminder();

  }, [client])
  useEffect(() => {
    clientref.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer.type);
      if (dataFromServer) {
        const state1 = {
          Task: dataFromServer.Task,
          Description: dataFromServer.Description,
          Label: dataFromServer.Label,
          Priority: dataFromServer.Priority,
          Task_Id: dataFromServer.Task_Id,
          Reminder_Id: dataFromServer.Reminder_Id,
          RemindTime: dataFromServer.RemindTime,
          TodayDate: dataFromServer.TodayDate,
          room: JSON.parse(localStorage.getItem("activeuser")).id
        }
        setState(state1)
        getNotificationModal(!notificationModal)
      
        var modal = document.getElementById("myModal");
        setTimeout(1000)
        if(modal!=null)
        modal.style.display = "block";
        console.log(stateref.current)
      }

    }

  }, [client])

  useEffect(() => {

    clientref.current.onopen = () => {
      console.log(clientref.current);

        console.log('WebSocket Client Connected');
    };

})

  const sendMessage = () => {
    ;
    clientref.current.send(JSON.stringify({
      type: "message",
      Task: 'sad',
      WhoSend: 'asd',
      Date: 'asd',
    }));
  }

  
 

  return (
    <div className="App flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-yellow-200 via-indigo-200 to-green-200">


      <Suspense fallback="loading"><Navi ></Navi></Suspense>

      <Routes >

        <Route path="/" element={<Suspense fallback="loading"><TaskManagement /></Suspense>} />
        <Route path="/Profile" element={<Suspense fallback="loading"><Profile /></Suspense>} />
        <Route path="/Addtask" element={<Suspense fallback="loading"><AddTasks /></Suspense>} />

      </Routes>
      {
        notificationModal ? (
          <div id="myModal" className="modal-alert">
            <div className="modal-alert-content">
              <span className="close" onClick={()=>notificationToggle()}>&times;</span>
              <PopupAlert state={stateref.current} />
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    tasks: state.taskReducers,
    activetask: state.activeTaskReducers,
    activereminder: state.activeReminderReducers,
    users: state.userReducers,
    reminders: state.reminderReducers,
    activeuser: state.activeUserReducers,
    loginstat: state.loginReducers,
    loginmodal: state.loginModalReducers,
    registermodal: state.registerModalReducers,
    roles: state.roleReducers,
    notificationModal:state.notificationModalReducers,
  }
}
const mapDispatchToProps = {
  getTask, getActiveTask, getUsers, getReminder, editTask, editReminder, editTaskOrder, deleteTask,
  getActiveUser, loginStat, getLoginModal, getRegisterModal, getRoles, getTaskSuccess, getActiveReminder,getNotificationModal

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
