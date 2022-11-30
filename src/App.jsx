import { useState } from 'react'
import './App.css'
import axios from 'axios';

let url = "https://fastapiserver-01.herokuapp.com/"

let month = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

let float_functions = ["Annual Income",
  "Monthly Inhand Salary",
  "Num Bank Accounts",
  "Num Credit Card",
  "Interest Rate",
  "Num Of Loan",
  "Delay From Due Date",
  "Num Of Delayed Payment",
  "Changed Credit Limit",
  "Num Credit Inquiries",
  "Credit Mix",
  "Outstanding Debt",
  "Credit Utilization Ratio",
  "Credit History Age",
  "Total Emi Per Month",
  "Amount Invested Monthly",
  "Monthly Balance"]

let proffessions = ["Accountant",
  "Architect",
  "Developer",
  "Doctor",
  "Engineer",
  "Entrepreneur",
  "Journalist",
  "Lawyer",
  "Manager",
  "Mechanic",
  "Media Manager",
  "Musician",
  "Scientist",
  "Teacher",
  "Writer",]



function getMonthFromString(mon) {
  return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
}

function App() {
  const [ageAlert, setAgeAlert] = useState(false)
  const [sendButton, setSendButton] = useState(true)

  function handleChange(event) {
    if (event.target.value < 14 || event.target.value > 60) {
      setAgeAlert(true)
    }
    else {
      setAgeAlert(false)
    }
  }

  async function doPredictRequest(body_request) {
    let payload = body_request
    setSendButton(false)
    let res = await axios.post(url+'predict', payload)
    let data = res.data
    setSendButton(true)
    console.log(data)
  }

  function clickSend(event) {
    var data = {
      month: getMonthFromString(document.getElementById("Month").value),
      age: Number(document.getElementById("Age").value)
    }
    var profession = document.getElementById("Profession").value;
    var min_amount = document.querySelector('input[name="exampleRadios"]:checked').value
    var spent = document.querySelector('input[name="exampleRadios2"]:checked').value
    var value = document.querySelector('input[name="exampleRadios3"]:checked').value
    var final = spent + value

    //Float values
    for (var i of float_functions) {
      data = { ...data, [i.toLowerCase().replaceAll(' ', '_')]: Number(document.getElementById(i).value) }
    }

    //Professions
    for (var i of proffessions) {
      data = { ...data, [i.toLowerCase().replaceAll(' ', '_')]: (profession == i ? 1 : 0) }
    }
    data = {
      ...data,
      nm: (min_amount == "nm" ? 1 : 0),
      no: (min_amount == "no" ? 1 : 0),
      yes: (min_amount == "yes" ? 1 : 0),
      high_spent_large_value_payments: (final == "high_spent_large_value_payments" ? 1 : 0),
      high_spent_medium_value_payments: (final == "high_spent_medium_value_payments" ? 1 : 0),
      high_spent_small_value_payments: (final == "high_spent_small_value_payments" ? 1 : 0),
      low_spent_large_value_payments: (final == "low_spent_large_value_payments" ? 1 : 0),
      low_spent_medium_value_payments: (final == "low_spent_medium_value_payments" ? 1 : 0),
      "low_spent_small_value_payments": (final == "low_spent_small_value_payments" ? 1 : 0)
    }
    doPredictRequest([data])

  }

  let send_button = <button type="button" className="btn btn-outline-success" onClick={clickSend}>Success</button>
  let loading_anim = <div class="spinner-border" role="status"></div>
  let age_alert = <div className="alert alert-danger" role="alert">La edad debe ser un valor entre 14 y 60</div>;

  return (

    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Banco Seneca</h1>
          <div className="card">
            <div className="card-body">
              <a>Bienvenido asesor. Por favor, rellene los datos a continuacion para
                hacer la prediccion o cargue un archivo CSV.</a>
            </div>


            {/* Boton de cargar CSV */}


          </div>
          {(ageAlert ? age_alert : null)}
          <form>
            <div className="form-group" key="Age">
              <label className="formGroupExampleInput">Age</label>
              <input onChange={handleChange} type="number" className="form-control" id="Age" placeholder="Inserte un valor numerico" />
            </div>
            <div className="form-group" key="Month">
              <label className="exampleFormControlSelect1">Month</label>
              <select className="form-control" id="Month">
                {month.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <div className="form-group" key="Profession">
              <label className="exampleFormControlSelect2">Profession</label>
              <select className="form-control" id="Profession">
                {proffessions.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            {float_functions.map((x) =>
              <div className="form-group" key={x}>
                <label className="formGroupExampleInput">{x}</label>
                <input type="number" className="form-control" id={x} placeholder="Inserte un valor numerico" />
              </div>)}
            <label className="formGroupExampleInput">Payment Minimum Amount</label>
            <div className="form-group" key="PaymentMinimumAmount">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="yes" />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="no" />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  No
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="nm" />
                <label className="form-check-label" htmlFor="exampleRadios3">
                  NM
                </label>
              </div></div>
            <label className="formGroupExampleInput">Spent Type</label>
            <div className="form-group" key="SentType">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios1" value="high_spent_" />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  High
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios2" value="low_spent_" />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Low
                </label>
              </div>
            </div>
            <label className="formGroupExampleInput">Value of the Payments</label>
            <div className="form-group" key="ValuePayment">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios1" value="large_value_payments" />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Large
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios2" value="medium_value_payments" />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Medium
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios2" value="small_value_payments" />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Small
                </label>
              </div>
            </div>

          </form>
          {(sendButton ? send_button : loading_anim)}
        </div>
      </div>
    </div>
  )
}

export default App
