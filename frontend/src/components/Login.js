import React, { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getUsers } from '../redux/actions/userActions'
import { getActiveUser } from '../redux/actions/userActions'
import { loginStat } from '../redux/actions/loginActions'
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { getRegisterModal } from '../redux/actions/registerModalActions'
import { getLoginModal } from "../redux/actions/loginModalActions";


import CryptoJS from "crypto-js";

import { useTranslation } from "react-i18next";

function Login({ loginStat, activeuser, users, getUsers, getActiveUser, getRegisterModal, registermodal, getLoginModal, loginmodal, ...props }) {
  let history = useNavigate();
  const { toggle } = props;

  const { t } = useTranslation("Login");


  {t("0.txt.totalcount.showingitemsreport")}


  useEffect(() => {
    getUsers()
  }, [getUsers])

  const login = () => {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
  
    users.forEach((user) => {
      var decryptedpass = CryptoJS.AES.decrypt( user.Password, "Secret Passphrase");
if (user.Email == email && decryptedpass.toString(CryptoJS.enc.Utf8) ==password) {
        localStorage.setItem("loginstat", "true")
        localStorage.setItem("activeuser", JSON.stringify(user))
        getActiveUser(user)
        loginStat("true")
        history("/Profile");
        getLoginModal(!loginmodal)
      } else {

        if (user.Password !== password) {
          if (password === "") {
            document.getElementById("passwordinvalid").innerHTML = t("0.txt.invalid")
          } else {
            document.getElementById("passwordinvalid").innerHTML = t("0.txt.passwordinvalid")
          }
          document.getElementById("password").className = "form-control is-invalid";
        }
        if (user.Email !== email) {
          if (email === "") {
            document.getElementById("emailinvalid").innerHTML = t("0.txt.invalid")
          } else {
            document.getElementById("emailinvalid").innerHTML = t("0.txt.emailinvalid")
          }

          document.getElementById("email").className = "form-control is-invalid";
        }
      }
    }
    )
  }
  const handleRegister = () => {
    toggle1();
  };
  const toggle1 = () => {
    getLoginModal(!loginmodal)
    getRegisterModal(!registermodal);
  };

  return (
    <div>

      <Container >
        <Row>
          <div className="loginmodal"  >
            <Modal isOpen={true} toggle={toggle} centered scrollable>
              <ModalHeader className="modal-header text-center" toggle={toggle} tag="h1">  {t("0.txt.header")}</ModalHeader>
              <Col className="col-12" >

                <Form noValidate>
                  <ModalBody>
                    <FormGroup>
                      <Label for="email">{t("0.txt.email")}</Label>
                      <Input className="form-control" type="email" name="email" id="email" required />
                      <div className="valid-feedback">{t("0.txt.valid")}</div>
                      <div id="emailinvalid" className="invalid-feedback">{t("0.txt.emailinvalid")}</div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">{t("0.txt.password")}</Label>
                      <Input className="form-control" type="password" name="password" id="password" required />
                      <div className="valid-feedback">{t("0.txt.valid")}</div>
                      <div id="passwordinvalid" className="invalid-feedback">{t("0.txt.passwordinvalid")}</div>
                    </FormGroup>
                    <br></br>
                    <Button outline className="justify-content-center" color="primary"  onClick={() => login()} >{t("0.txt.loginbtn")}</Button>
                  </ModalBody>
                </Form>
              </Col>
              <ModalFooter>
                <p className="m-auto">{t("0.txt.registerinfo")} <a href="#\" onClick={handleRegister}>{t("0.txt.registerbtn")}</a>.</p>

              </ModalFooter>
            </Modal>
          </div>

        </Row>
      </Container>

    </div>
  );
}
function mapStateToProps(state, ownProps) {
  return {
    users: state.userReducers,
    activeuser: state.activeUserReducers,
    loginstat: state.loginReducers,
    registermodal: state.registerModalReducers,
    loginmodal: state.loginModalReducers
  }
}
const mapDispatchToProps = {
  getUsers, getActiveUser, loginStat, getRegisterModal, getLoginModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
