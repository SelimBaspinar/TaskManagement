

import React from 'react';

import { connect } from "react-redux";
import { editReminder } from '../redux/actions/reminderActions'


import { getNotificationModal } from '../redux/actions/notificationModalActions'


import { useTranslation } from "react-i18next";
import "../css/PopupAlert.scss";
import {
    Container,
    Row,
} from 'reactstrap';
function PopupAlert({ tasks, activetask,   users, reminders, editReminder, activeuser,state,getNotificationModal,notificationmodal,
     ...props }) {
    const { t } = useTranslation("AddTasks");
    const postpone =()=>{
    console.log(tasks)
    console.log(state.Task_Id)

       const reminder= reminders.filter((t)=>t.id==state.Reminder_Id)
       reminder[0].ReminderStat=false
  var d = new Date(reminder[0].RemindTime);  
  // Add 1 hour to datetime
  d.setHours(d.getHours() + 1);

       reminder[0].RemindTime= d.toISOString()
editReminder(reminder[0])
getNotificationModal(!notificationmodal)
    
    }
    const okey =()=>{
    getNotificationModal(!notificationmodal)
        
        }

    return (
        <div>
            <Container fluid>
                <Row>
                <div id="popupalert">
  <div className={"alert-box"+"_"+state.Priority}>
    <div className="face">
      <div className="eye"></div>
      <div className="eye right"></div>
      <div className="mouth happy"></div>
    </div>
    <div className="shadow scale"></div>
    <div className="message"><h1 className="alert">Reminder!</h1><p>{state.Task+", "+state.Description} </p></div>
    <div>
    <button className="button-box postpone" onClick={()=>postpone()}><h1 className={"button"+"_"+state.Priority}>Postpone</h1>    </button>
      <button className="button-box okey" onClick={()=>okey()}><h1 className={"button"+"_"+state.Priority}>Okey</h1>    </button>
      </div>
  </div>
  </div>
          </Row>
            </Container>
          
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
        notificationmodal:state.notificationModalReducers,
    }
}
const mapDispatchToProps = {
    editReminder,getNotificationModal

}

export default connect(mapStateToProps, mapDispatchToProps)(PopupAlert)


