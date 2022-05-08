import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getTask } from '../redux/actions/taskActions'
import "../css/AddTask.css"
import { Label, Input, Button, Form, FormGroup, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import { useTranslation } from "react-i18next";
import axios from "axios";
import qs from "qs"
import $ from "jquery"
function AddTasks({ getTask, tasks, activeTask, createstat, editstat, activeuser, activereminder,
    ...props }) {
    const { t } = useTranslation("AddTasks");
    const [modal, setModal] = useState(false);
    const [remindstat, setRemindStat, remindstatref] = useState(false);

    let history = useNavigate();

    useEffect(() => {

        getTask();
        if (editstat == true) {
            $("#remind").prop('checked', activeTask.Reminder);
            setRemindStat($("#remind").is(':checked'))
        }

    }, [getTask])
    const toggle = () => {
        setModal(!modal);
    };




    const AddTaskDb =  async () => {
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let Priority = document.getElementById("priority").value;
        let Label = document.getElementById("label").value;
        let Time = new Date().toISOString();
        let Reminder = document.getElementById("remind").checked;
        let RemindTime = document.getElementById("remindtime").value;

        let Task = {
            id: 0,
            Name: name,
            Description: description,
            Priority: Priority,
            Label: Label,
            Time: Time,
            Reminder: Reminder,
            Stat: createstat,
            User: activeuser.id
        }
        console.log(activeTask.id)
    

        if (editstat == true) {
            Task.id = activeTask.id

            await axios.put(`/api/tasks/${activeTask.id}/`, qs.stringify(Task))


            if (activeTask.Reminder == true) {
                let TaskReminder = {
                    id: activereminder.id,
                    RemindTime: RemindTime,
                    Task: activeTask.id,
                }
                console.log(TaskReminder)
                await axios.put(`/api/reminders/${activereminder.id}/`, qs.stringify(TaskReminder))
            }else{
                let TaskReminder = {
                    RemindTime: RemindTime,
                    Task: activeTask.id,
                }
                if (remindstat == true) {
                    await axios.post("/api/reminders/", qs.stringify(TaskReminder)).catch((err) => console.log(err))
                }
            }
setModal(!modal)
history("/")
        } else {
            const { data } = await axios.post("/api/tasks/", qs.stringify(Task)).catch((err) => console.log(err))
            let TaskReminder = {
                RemindTime: RemindTime,
                Task: data.id,
            }
            if (remindstat == true) {
                await axios.post("/api/reminders/", qs.stringify(TaskReminder)).catch((err) => console.log(err))
            }
        }

        setModal(!modal)
        history("/")

    }


    return (
        <div>
            <Container>
                <Row>
                </Row>
                <br />
                <Row>
                    <Col></Col>
                    <Col>
                        <h2 className="text-center">
                            {t("0.txt.Form.header")}
                        </h2>
                    </Col>
                    <Col></Col>
                </Row>
                <br />
                <Form noValidate>

                    <Row>
                        <Col></Col>
                        <Col>
                            <FormGroup>
                                <Label for="name">{t("0.txt.Form.name")}</Label>
                                <Input type="text" name="name" id="name" defaultValue={editstat == true ?
                                    activeTask.Name
                                    : null} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="label">{t("0.txt.Form.label")}</Label>
                                <Input type="text" name="label" id="label" defaultValue={editstat == true ?
                                    activeTask.Label
                                    : null} />

                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className='col-6'>
                            <FormGroup>
                                <Label for="description">{t("0.txt.Form.description")}</Label>
                                <textarea className='form-control' name="description" id="description" defaultValue={editstat == true ?
                                    activeTask.Description
                                    : null} />
                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <FormGroup>
                                <Label for="priority">{t("0.txt.Form.priority")}</Label>
                                <Input type="text" name="priority" id="priority" defaultValue={editstat == true ?
                                    activeTask.Priority
                                    : null} />

                            </FormGroup>

                            <FormGroup>
                                <Input type="checkbox" id="remind" name="remind" value="remindstat" onChange={() => setRemindStat($("#remind").is(':checked'))} />
                                <Label for="remind">{t("0.txt.Form.remind")}</Label>

                            </FormGroup>
                            <Row>
                                <Col>
                                    {remindstatref.current == true ?
                                        <FormGroup>
                                            <Label for="datetime" className="form-label">{t("0.txt.Form.remindtime")}</Label>
                                            <Input type="datetime-local" name="datetime" id="remindtime" defaultValue={editstat == true ?
                                                activeTask.RemindTime
                                                : null} />
                                        </FormGroup>
                                        : null
                                    }

                                </Col>
                            </Row>
                            <br />
                            <Button outline color='primary' onClick={() => AddTaskDb()}>{t("0.txt.Form.create")}</Button>
                        </Col>
                        <Col>

                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
            </Container>
            {modal ? (
                <Modal isOpen={true} toggle={toggle} scrollable>
                    <ModalHeader className="modal-header text-center" toggle={toggle} tag="h2">  {t("0.txt.Form.ModalInfoHeader")}</ModalHeader>
                    <ModalBody>
                        <h4>{t("0.txt.Form.ModalInfoBody")}</h4>
                    </ModalBody>
                </Modal>
            ) : null}
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        tasks: state.TaskReducers,
        activeTask: state.activeTaskReducers,
        activeuser: state.activeUserReducers,
        activereminder: state.activeReminderReducers,

    }
}
const mapDispatchToProps = {
    getTask

}

export default connect(mapStateToProps, mapDispatchToProps)(AddTasks)