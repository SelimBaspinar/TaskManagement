import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref'

import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { deleteTask, getTask } from '../redux/actions/taskActions'
import {  getTaskSuccess } from '../redux/actions/taskActions'
import { deleteReminder,getActiveReminder } from '../redux/actions/reminderActions'

import { getReminder } from '../redux/actions/reminderActions'
import { getUsers } from '../redux/actions/userActions'

import { getActiveTask } from '../redux/actions/taskActions'

import { getActiveUser } from '../redux/actions/userActions'
import { loginStat } from '../redux/actions/loginActions'
import { getRoles } from '../redux/actions/roleAction'

import { DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import $ from "jquery"
import AddTasks from './AddTasks';
import axios from "axios";
import qs from "qs";
function TaskManagement({ getTask, getActiveTask, tasks, activetask, getUsers, getReminder, users, reminders,deleteTask, getTaskSuccess
    , loginstat, loginStat, activeuser, getActiveUser,getActiveReminder,activereminder,
    getRoles, roles, ...props }) {
    const [modal, setModal] = useState(false);
    const [createModal, setCreateModal, createmodalref] = useState(false);
    const mounted = useRef();
    const { t, i18n } = useTranslation("TaskManagement");
    let history = useNavigate();
    const [createstat, setCreatestat, createstatref] = useState("Planned");
    const [editstat, setEditstat, editstatref] = useState(false);
    const [editmode, setEditMode, editmoderef] = useState(true);

    useEffect(() => {
            getUsers();
            getTask();
            getActiveUser(JSON.parse(localStorage.getItem("activeuser")));
            loginStat(localStorage.getItem("loginstat"))
            getRoles();
            getReminder();
            
        
    }, [])
    

    const createToggle=(e,stat) =>{
        if(activeuser!=null && activeuser.length!=0)                                
     {   setCreatestat(stat);
        setCreateModal(!createModal);}
    };
 
    const toggle = () => {
        setModal(!modal);
    };



    async function handleOnDragEnd(result) {
        if (!result.destination) return;

        const itemsplanned = Array.from(tasks.filter((task, i) => (task.Stat == "Planned")))
        const itemsdone = Array.from(tasks.filter((task, i) => (task.Stat == "Done")))
        const itemscancelled = Array.from(tasks.filter((task, i) => (task.Stat == "Cancelled")))
        const items = [...itemsplanned, ...itemsdone, ...itemscancelled];
        const reorderedItem = items[result.source.index];
        reorderedItem.Stat = result.destination.droppableId
        items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
         console.log(items[result.destination.index-1]) 
         console.log(items.length)   
  
        if(result.destination.index>items.length-1){
            axios
            .put(`/api/tasks/${items[result.source.index].id}/`, qs.stringify(items[result.destination.index-1])).then((res) =>axios
            .put(`/api/tasks/${items[result.destination.index-1].id}/`, qs.stringify(reorderedItem)));
        }else{
            axios
            .put(`/api/tasks/${items[result.source.index].id}/`, qs.stringify(items[result.destination.index])).then((res) =>axios
            .put(`/api/tasks/${items[result.destination.index].id}/`, qs.stringify(reorderedItem)));
        }
        
  
        console.log(items)
        console.log("source index : " + result.source.index)
        console.log("destination index : " + result.destination.index)
        getTaskSuccess(items)
    }
    const ChangeEditMode = () => {
        setEditMode(!editmode);
     
    }
    const SaveList = () => {
        setEditMode(!editmode);
       
    }

    function RenderPlannedTasks(props) {
        const stat = props.stat;
        let index = -1
        if (stat == "Done") {
            index = $(".Planned_draggable").length - 1
        } else if (stat == "Cancelled") {
            index = $(".Planned_draggable").length + $(".Done_draggable").length - 1
        }
        if(activeuser!=null && activeuser.length!=0&&activeuser!="")
        return tasks.map((task) => {
         
            if (task.User == activeuser.id) {
                if (task.Stat == stat) {
                    index = index + 1
                    return (<Draggable key={task.id} draggableId={task.id.toString()} index={index} isDragDisabled={editmoderef.current}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={stat + "_draggable " + "relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"}>

                                {RenderOptions(task)}

                                <div className={"Priority-" + task.Priority}>
                                    {task.Priority == 0 ?

                                        <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-green-100 rounded-full"> {task.Label}</span>
                                        : task.Priority == 1 ?
                                            <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-blue-100 rounded-full">  {task.Label}</span>
                                            : task.Priority == 2 ?
                                                <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-orange-100 rounded-full">  {task.Label}</span>
                                                : task.Priority == 3 ?
                                                    <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">  {task.Label}</span>
                                                    :
                                                    <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-red-100 rounded-full">  {task.Label}</span>
                                    }
                                </div>
                                <h4 className="mt-3 text-sm font-medium">{task.Name}</h4>
                                <div className="mt-3 text-sm font-medium">{task.Description}</div>
                                <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-1 leading-none">{task.Time}</span>
                                    </div>
                                    <div>
                                        {task.Reminder == true ? <>{
                                            reminders.map(reminder =>
                                                reminder.Task == task.id ?
                                                    <div className="relative flex items-center ml-4">
                                                        <svg className="w-4 h-4 text-gray-300 fill-current ml-5 mt-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="ml-1 leading-none">{"R_Time : " + reminder.RemindTime}</span>
                                                    </div>

                                                    : null
                                            )
                                        }
                                        </>
                                            : null
                                        }</div></div>

                            </div>
                        )}
                    </Draggable>)


                }

            }
        })

    }

    const removeTask = (task,reminder) => {
        console.log("deleted")
        deleteTask(task.id)
        deleteReminder(reminder.id)
    }
    const editTasks = (task,reminder,createstat) => {
        getActiveTask(task)
        
        getActiveReminder(reminder)
        setEditstat(true)
        setCreatestat(createstat)
        setCreateModal(!createModal)
    }
    function RenderOptions(task) {
        return <div className="flex flex-cı mr-0 ml-auto">

            <UncontrolledDropdown>
                <DropdownToggle nav>
                    <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                </DropdownToggle>
                <DropdownMenu>
                       
                            <DropdownItem onClick={() => {
                                if(task.Reminder==true)
                                reminders.map(reminder=>{
                                    if(reminder.Task==task.id){
                                        editTasks(task,reminder,task.Stat)
                                    }else{
                                        editTasks(task,"",task.Stat)
                                    }
                                })
                            else{
                                editTasks(task,"",task.Stat)
                            }}}> {t("0.txt.threedotmenu.edit")}</DropdownItem>
                            <DropdownItem onClick={() => 
                                {
                                    if(task.Reminder==true)
                                    reminders.map(reminder=>{
                                        if(reminder.Task==task.id){
                                            removeTask(task,reminder,task.Stat)
                                        }else{
                                            removeTask(task,"",task.Stat)
                                        }
                                    })
                                else
                                    removeTask(task,"",task.Stat)
                                }
                               }>{t("0.txt.threedotmenu.delete")}</DropdownItem>
                            
                
                            
               
                </DropdownMenu>
            </UncontrolledDropdown></div>
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <div className="flex flex-col w-screen h-screen taskmanagement overflow-auto">
                        <div className="px-10 mt-6">
                            <Row>
                                <Col>
                                    <h1 className="text-2xl font-bold">{t("0.txt.header")}</h1></Col>
                                <Col />
                                <Col />
                                <Col>
                                    <div className='d-flex flex-row-reverse'>
                                        {editmoderef.current == false ?
                                            <button onClick={() => ChangeEditMode()} className='items-center justify-center w-6 h-6   text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'>
                                                <i className="fa-solid fa-floppy-disk"></i></button>
                                            : null}

                                        <button onClick={() => ChangeEditMode()} className='items-center justify-center w-6 h-6 text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'>
                                            <i className="fa-solid fa-pen-to-square"></i></button></div></Col>
                            </Row>
                        </div>
                        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                            <DragDropContext dra onDragEnd={handleOnDragEnd} >

                                <div className="col flex flex-col flex-shrink-0 w-auto h-auto">
                                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                                        <span className="block text-sm font-semibold">{t("0.txt.planned")}</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">{$(".Planned_draggable").length}</span>


                                        <RenderOptions></RenderOptions>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100" onClick={()=> createToggle("Planned")}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Droppable droppableId="Planned" type='task' >
                                        {(provided, snapshot) => (
                                            <div className="Planned flex flex-col pb-2 overflow-auto" {...provided.droppableProps} ref={provided.innerRef} >

                                                <RenderPlannedTasks stat={"Planned"} />
                                                {provided.placeholder}

                                            </div>)}
                                    </Droppable>
                                </div>
                                <div className="col flex flex-col flex-shrink-0 w-auto">
                                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                                        <span className="block text-sm font-semibold">{t("0.txt.done")}</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">{$(".Done_draggable").length}</span>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100" onClick={() => {
                                                    if(activeuser!=null && activeuser.length!=0)
                                                    createToggle("Done")
                                                    else
                                                    alert(t("0.txt.loginalert"))}}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Droppable droppableId="Done" type='task'>
                                        {(provided, snapshot) => (
                                            <div className="Done flex flex-col pb-2 overflow-auto" {...provided.droppableProps} ref={provided.innerRef} >

                                                <RenderPlannedTasks stat={"Done"} />
                                                {provided.placeholder}

                                            </div>)}
                                    </Droppable>
                                </div>
                                <div className="col flex flex-col flex-shrink-0 w-auto">
                                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                                        <span className="block text-sm font-semibold">{t("0.txt.cancelled")}</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">{$(".Cancelled_draggable").length}</span>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100" onClick={() => {
                                                    if(activeuser!=null && activeuser.length!=0)
                                                    createToggle("Cancelled")
                                                    else
                                                    alert(t("0.txt.loginalert"))}}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Droppable droppableId="Cancelled" type='task'>
                                        {(provided, snapshot) => (
                                            <div className="Cancelled flex flex-col pb-2 overflow-auto" {...provided.droppableProps} ref={provided.innerRef} >

                                                <RenderPlannedTasks stat={"Cancelled"} />
                                                {provided.placeholder}

                                            </div>)}
                                    </Droppable>
                                </div>
                            </DragDropContext>

                        </div>

                    </div>


                </Row>
            </Container>
            {modal ? (
                <Modal isOpen={true} toggle={toggle} scrollable>
                    <ModalHeader className="modal-header text-center" toggle={toggle} tag="h2">  {t("0.txt.ModalInfoHeader")}</ModalHeader>
                    <ModalBody>
                        <h4>{t("0.txt.ModalInfoBody")}</h4>
                    </ModalBody>
                </Modal>
            ) : null}
            {
                createModal ? (
                    <Modal isOpen={createModal} fullscreen toggle={createToggle} scrollable>
                        <ModalHeader className="modal-header text-center" toggle={createToggle} tag="h2">  {t("0.txt.create")}</ModalHeader>
                        <ModalBody>
                           
                                <AddTasks createstat={createstat} editstat={editstat}  />
                        </ModalBody>
                    </Modal>
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
        roles: state.roleReducers,
    }
}
const mapDispatchToProps = {
    getTask, getActiveTask, getUsers, getReminder, deleteTask,
    getActiveUser, loginStat, getRoles, getTaskSuccess,getActiveReminder

}

export default connect(mapStateToProps, mapDispatchToProps)(TaskManagement)